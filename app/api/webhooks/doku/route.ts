import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { getDokuConfig } from '@/lib/doku';

export async function POST(request: Request) {
  try {
    const clientId = request.headers.get('client-id') || '';
    const requestId = request.headers.get('request-id') || '';
    const timestamp = request.headers.get('request-timestamp') || '';
    const receivedSignature = request.headers.get('signature') || '';
    
    // Read raw body to calculate digest properly
    const rawBody = await request.text();
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const dokuConfig = getDokuConfig();
    const url = new URL(request.url);
    const targetPath = url.pathname; // Usually /api/webhooks/doku
    
    const digest = crypto.createHash('sha256').update(rawBody, 'utf8').digest('base64');
    const component = `Client-Id:${clientId}\nRequest-Id:${requestId}\nRequest-Timestamp:${timestamp}\nRequest-Target:${targetPath}\nDigest:${digest}`;
    
    const calculatedHmac = crypto
      .createHmac('sha256', dokuConfig.secretKey)
      .update(component)
      .digest('base64');
    
    const expectedSignature = `HMACSHA256=${calculatedHmac}`;

    const isSimulation = request.headers.get('x-simulate-webhook') === 'true';
    const isDev = process.env.NODE_ENV !== 'production';

    if (receivedSignature !== expectedSignature) {
      if (isSimulation && isDev) {
        console.warn('DOKU Webhook Signature mismatch bypassed for local simulation');
      } else {
        console.warn('DOKU Webhook Signature mismatch');
        return NextResponse.json(
          { error: 'Unauthorized: Invalid Signature' },
          { status: 401 }
        );
      }
    }

    const { orderId, orderNumber, paymentStatus } = body;

    if (!orderId && !orderNumber) {
      return NextResponse.json(
        { error: 'Order ID atau Order Number tidak ditemukan.' },
        { status: 400 }
      );
    }

    // Find existing order
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: orderId }, { orderNumber: orderNumber }],
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Data transaksi tidak ditemukan.' },
        { status: 404 }
      );
    }

    // Update order status to PAID
    if (paymentStatus === 'PAID') {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'PAID' },
      });

      // Generate Secure Download Token for customer (valid for 24 hours)
      const tokenString = crypto.randomBytes(24).toString('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Check if download token already exists for this order
      const existingToken = await prisma.downloadToken.findFirst({
        where: { orderId: order.id },
      });

      if (!existingToken) {
        await prisma.downloadToken.create({
          data: {
            token: tokenString,
            orderId: order.id,
            productId: order.productId,
            expiresAt,
            downloadCount: 0,
            maxDownloads: 10,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'DOKU Webhook Notification diproses dengan sukses.',
      orderId: order.id,
      status: 'PAID',
    });
  } catch (error) {
    console.error('Error handling DOKU webhook:', error);
    return NextResponse.json(
      { error: 'Gagal memproses DOKU Webhook Notification.' },
      { status: 500 }
    );
  }
}
