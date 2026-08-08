# Changelog
All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]
### Added
- Created `doku-mcp-server` standalone TypeScript MCP Server to enable autonomous AI agent transactions via DOKU Payment Gateway APIs.
- Configured `.agents/mcp.json` to properly point to the newly built DOKU MCP Server.
- Added `X-Simulate-Webhook` header support in the local DOKU Webhook handler (`app/api/webhooks/doku/route.ts`) to allow seamless local testing of payment success flows without requiring an actual HMAC signature (restricted to `development` environments).
- Added Production Readiness Checkout Routing: The frontend (`app/checkout/[productSlug]/page.tsx`) now natively detects the sandbox/production environment from the API and instantly redirects users to the live DOKU Payment Gateway URL if in production mode, bypassing the local development simulator.

- Added `Vitest` unit testing for the `doku.ts` webhook HMAC-SHA256 signature generator to ensure cryptographic security.
- Added `Playwright` End-to-End (E2E) testing framework.
- Wrote E2E automated test for the Guest Checkout flow (`tests/e2e/checkout-flow.spec.ts`).
- Created `.github/workflows/test-and-deploy.yml` for Continuous Integration.
- Added comprehensive legal documentation and Next.js routes for Kebijakan Privasi, Syarat & Ketentuan, Perlindungan Data Pribadi (UU PDP), and Syarat Pembayaran.

### Changed
- Refactored `layout.tsx` to use `next/font/google` for Cormorant Garamond, Inter, and Plus Jakarta Sans to eliminate Cumulative Layout Shift (CLS) and improve LCP metrics.
- Injected `Organization` and `WebSite` JSON-LD Structured Data in `app/page.tsx` for Google Rich Snippets and Generative Engine Optimization (GEO).
- Added dynamic `generateMetadata` and `Product` JSON-LD to `app/products/[slug]/page.tsx` for optimal search engine crawling and product rich snippets.
- Removed custom `DokuPaymentModal` simulator completely. The application now natively integrates the **DOKU Jokul Checkout Popup** library, allowing the official DOKU Payment page to render directly as an in-app modal without forcing users to leave the application (with automatic fallback to redirect if the script fails).
- Reinstated background payment polling: The checkout page now actively polls `/api/orders/status` behind the scenes while the DOKU modal is open. Upon detecting a successful webhook confirmation, the frontend instantly closes the flow and redirects the user to the secured success and file-download page.
- Complete visual UI overhaul of `DokuPaymentModal.tsx` to implement a highly premium, glassmorphism aesthetic with animated real-time scanning states and better user affordances (Removed in subsequent iteration in favor of official DOKU flow).
- **Major UI/UX Revamp**: Upgraded the overall theme to a modern, fresh tech aesthetic. Replaced editorial dark greens/browns with vibrant Indigo and Sky Blue, transitioned from Cormorant Garamond to modern sans-serif fonts (Outfit and Inter), and updated all components to standard Tailwind v4 utility classes.
- Removed "Admin Area" access buttons from public-facing Navbar and Footer components.

### Fixed
- Fixed DOKU Signature Verification failures when simulating payments locally by properly distinguishing between production webhook payloads and local simulator payloads.
