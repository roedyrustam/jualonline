# ADR-001: Implement Standalone TypeScript DOKU MCP Server

**Status**: Accepted
**Date**: 2026-08-07
**Deciders**: Fullstack Engineering Team

## Context
With the shift towards AI Agentic Commerce, we need a way for LLM-driven agents (such as Claude Desktop, Cursor, or Antigravity) to natively interact with the DOKU Payment Gateway APIs (e.g., generating checkout links, checking transaction statuses) in an autonomous yet secure manner. Our main Next.js application already implements a secure webhook handler and a frontend simulator. However, directly exposing our internal Next.js APIs to LLM agents is insecure due to authentication boundaries, and giving agents direct access to raw DOKU credentials in the main repository environment increases security risks.

## Decision
We decided to build a standalone, dedicated **DOKU MCP (Model Context Protocol) Server** written in TypeScript (`/doku-mcp-server`), utilizing the official `@modelcontextprotocol/sdk`. 

This server acts as a middleware bridge, wrapping the DOKU Jokul API endpoints into standardized MCP Tools (`create_checkout_payment`, `check_transaction_status`). 
The LLM agents communicate with this server over STDIO, securely configured via `.agents/mcp.json`.

## Rationale
- **Security & Isolation**: The MCP Server runs as a separate Node process. It exclusively handles the HMAC-SHA256 signature generation without leaking the `DOKU_SECRET_KEY` back to the agent's context window.
- **Interoperability**: Implementing the standard MCP interface ensures that *any* agent supporting the protocol can interact with our payment infrastructure without custom HTTP API integrations.
- **Maintainability**: Isolating the AI tooling from the core Next.js application ensures our production web server is decoupled from agent-specific tasks.

## Consequences
**Positive:**
- AI agents can now seamlessly trigger DOKU payment workflows.
- No direct exposure of Merchant Secrets to the LLM context.
- Adherence to the `doku-mcp-server` integration guidelines.

**Negative:**
- Requires managing an additional node project and dependency (`@modelcontextprotocol/sdk`) within the monorepo-style structure.
- Requires building (`tsc`) the server separately when making updates to the tool schemas.
