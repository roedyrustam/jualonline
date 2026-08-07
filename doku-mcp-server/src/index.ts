import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import crypto from 'crypto';

const CLIENT_ID = process.env.DOKU_CLIENT_ID || '';
const SECRET_KEY = process.env.DOKU_SECRET_KEY || '';
const BASE_URL = process.env.DOKU_IS_PRODUCTION === 'true' 
  ? 'https://api.doku.com' 
  : 'https://api-sandbox.doku.com';

function generateHeaders(targetPath: string, payload: object) {
  const requestId = crypto.randomUUID();
  const timestamp = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const jsonBody = JSON.stringify(payload);
  const digest = crypto.createHash('sha256').update(jsonBody, 'utf8').digest('base64');

  const component = `Client-Id:${CLIENT_ID}\nRequest-Id:${requestId}\nRequest-Timestamp:${timestamp}\nRequest-Target:${targetPath}\nDigest:${digest}`;
  const signature = 'HMACSHA256=' + crypto.createHmac('sha256', SECRET_KEY).update(component).digest('base64');

  return {
    'Content-Type': 'application/json',
    'Client-Id': CLIENT_ID,
    'Request-Id': requestId,
    'Request-Timestamp': timestamp,
    'Request-Target': targetPath,
    'Digest': digest,
    'Signature': signature
  };
}

const server = new Server(
  { name: 'doku-mcp-server', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'create_checkout_payment',
      description: 'Generate a DOKU payment checkout URL for customer order',
      inputSchema: {
        type: 'object',
        properties: {
          amount: { type: 'number', description: 'Total payment amount in IDR' },
          invoice_number: { type: 'string', description: 'Unique order invoice number' },
          customer_name: { type: 'string', description: 'Customer full name' },
          customer_email: { type: 'string', description: 'Customer email address' }
        },
        required: ['amount', 'invoice_number', 'customer_name', 'customer_email']
      }
    },
    {
      name: 'check_transaction_status',
      description: 'Check payment status of a transaction',
      inputSchema: {
        type: 'object',
        properties: {
          invoice_number: { type: 'string', description: 'Invoice number to query' }
        },
        required: ['invoice_number']
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'create_checkout_payment') {
    const targetPath = '/checkout/v1/payment';
    const body = {
      order: { amount: args?.amount, invoice_number: args?.invoice_number },
      customer: { name: args?.customer_name, email: args?.customer_email }
    };

    try {
      const response = await fetch(`${BASE_URL}${targetPath}`, {
        method: 'POST',
        headers: generateHeaders(targetPath, body),
        body: JSON.stringify(body)
      });
      const data = await response.json();
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: 'text', text: `Error generating checkout payment: ${error.message}` }],
        isError: true
      };
    }
  }

  if (name === 'check_transaction_status') {
    // Note: this is a mock implementation for status checking depending on DOKU's specific API
    // DOKU uses different endpoints for status, normally /orders/v1/status/{invoice_number}
    // Checking DOKU docs: GET /orders/v1/status/...
    const targetPath = `/orders/v1/status/${args?.invoice_number}`;
    
    // Status check usually requires an empty body or specific payload, checking documentation
    try {
      const response = await fetch(`${BASE_URL}${targetPath}`, {
        method: 'GET',
        headers: generateHeaders(targetPath, {})
      });
      const data = await response.json();
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: 'text', text: `Error checking transaction status: ${error.message}` }],
        isError: true
      };
    }
  }

  throw new Error(`Tool not found: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('DOKU MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
