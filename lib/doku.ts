import crypto from 'crypto';

export interface DokuConfig {
  clientId: string;
  secretKey: string;
  isSandbox: boolean;
}

export function getDokuConfig(): DokuConfig {
  return {
    clientId: process.env.DOKU_CLIENT_ID || 'BRN-0265-1785778928588',
    secretKey: process.env.DOKU_SECRET_KEY || 'doku_key_sandbox_1937b31427cf4b948200287a5c0dc707',
    isSandbox: process.env.DOKU_ENVIRONMENT !== 'production',
  };
}

/**
 * Generate DOKU SHA-256 Digest for request payload
 */
export function generateDigest(bodyString: string): string {
  return crypto.createHash('sha256').update(bodyString).digest('base64');
}

/**
 * Generate HMAC-SHA256 DOKU Signature according to official DOKU API standard
 */
export function generateDokuSignature({
  clientId,
  secretKey,
  requestId,
  requestTimestamp,
  requestTarget,
  digest,
}: {
  clientId: string;
  secretKey: string;
  requestId: string;
  requestTimestamp: string;
  requestTarget: string;
  digest: string;
}): string {
  const component = [
    `Client-Id:${clientId}`,
    `Request-Id:${requestId}`,
    `Request-Timestamp:${requestTimestamp}`,
    `Request-Target:${requestTarget}`,
    `Digest:${digest}`,
  ].join('\n');

  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(component);
  return `HMACSHA256=${hmac.digest('base64')}`;
}
