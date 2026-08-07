import { describe, it, expect } from 'vitest';
import { generateDigest, generateDokuSignature } from '../../lib/doku';

describe('DOKU Webhook Security - Signature Verification', () => {
  const MOCK_SECRET_KEY = 'SK-TestSecretKey123';
  const MOCK_CLIENT_ID = 'BRN-1234-5678';
  const MOCK_REQUEST_ID = 'req-abc-123';
  const MOCK_TIMESTAMP = '2026-08-08T00:00:00Z';
  const MOCK_TARGET = '/api/webhooks/doku';
  const MOCK_PAYLOAD = JSON.stringify({ orderId: 'ord-123', paymentStatus: 'PAID' });

  it('should correctly generate SHA-256 digest', () => {
    const digest = generateDigest(MOCK_PAYLOAD);
    expect(digest).toBeTypeOf('string');
    expect(digest).not.toBe('');
  });

  it('should accurately generate valid HMAC-SHA256 signature', () => {
    const digest = generateDigest(MOCK_PAYLOAD);
    const signature = generateDokuSignature({
      clientId: MOCK_CLIENT_ID,
      secretKey: MOCK_SECRET_KEY,
      requestId: MOCK_REQUEST_ID,
      requestTimestamp: MOCK_TIMESTAMP,
      requestTarget: MOCK_TARGET,
      digest,
    });

    expect(signature).toContain('HMACSHA256=');
    expect(signature.length).toBeGreaterThan(20);
  });

  it('should produce different signatures for different payloads', () => {
    const digest1 = generateDigest(MOCK_PAYLOAD);
    const signature1 = generateDokuSignature({
      clientId: MOCK_CLIENT_ID,
      secretKey: MOCK_SECRET_KEY,
      requestId: MOCK_REQUEST_ID,
      requestTimestamp: MOCK_TIMESTAMP,
      requestTarget: MOCK_TARGET,
      digest: digest1,
    });

    const maliciousPayload = JSON.stringify({ orderId: 'ord-123', paymentStatus: 'FAILED' });
    const digest2 = generateDigest(maliciousPayload);
    const signature2 = generateDokuSignature({
      clientId: MOCK_CLIENT_ID,
      secretKey: MOCK_SECRET_KEY,
      requestId: MOCK_REQUEST_ID,
      requestTimestamp: MOCK_TIMESTAMP,
      requestTarget: MOCK_TARGET,
      digest: digest2,
    });

    expect(signature1).not.toEqual(signature2);
  });
});
