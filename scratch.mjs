import crypto from 'crypto';
function test(sk) {
  const finalPrice = 10000;
  const requestId = crypto.randomUUID();
  const requestTimestamp = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const requestTarget = '/checkout/v1/payment';
  
  const payload = {
    order: { amount: finalPrice, invoice_number: 'INV-DOKU-' + Date.now() },
    payment: { payment_due_date: 60 },
    customer: { name: "Test User", email: "test@test.com" }
  };
  const payloadString = JSON.stringify(payload);
  const digest = crypto.createHash('sha256').update(payloadString).digest('base64');
  const component = `Client-Id:BRN-0265-1785778928588\nRequest-Id:${requestId}\nRequest-Timestamp:${requestTimestamp}\nRequest-Target:${requestTarget}\nDigest:${digest}`;
  const signature = 'HMACSHA256=' + crypto.createHmac('sha256', sk).update(component).digest('base64');
  
  fetch('https://api-sandbox.doku.com/checkout/v1/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': 'BRN-0265-1785778928588',
      'Request-Id': requestId,
      'Request-Timestamp': requestTimestamp,
      'Request-Target': requestTarget,
      'Digest': digest,
      'Signature': signature
    },
    body: payloadString
  }).then(r => r.json()).then(d => console.log(sk, JSON.stringify(d, null, 2)));
}
test('SK-UryyYX94dymTXDAcOHvY');
