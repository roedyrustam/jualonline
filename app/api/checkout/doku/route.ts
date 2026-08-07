import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getDokuConfig, generateDigest, generateDokuSignature } from '@/lib/doku';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, customerName, customerEmail, customerPhone, couponCode, discountAmount } = body;

    if (!productId || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: 'Mohon lengkapi semua bidang parameter transaksi.' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Produk digital tidak ditemukan.' },
        { status: 404 }
      );
    }

    const dokuConfig = getDokuConfig();
    const validDiscount = Number(discountAmount || 0);
    const finalPrice = Math.max(0, product.price - validDiscount);

    // Generate unique order number & DOKU Invoice Number
    const timestamp = Date.now().toString().slice(-6);
    const randomHex = crypto.randomBytes(2).toString('hex').toUpperCase();
    const orderNumber = `DKU-${timestamp}-${randomHex}`;
    const dokuInvoiceNumber = `INV-DOKU-${timestamp}-${randomHex}`;

    // Generate DOKU Signature & Digest
    const requestId = crypto.randomUUID();
    const requestTimestamp = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
    const requestTarget = '/checkout/v1/payment';
    
    const payload = {
      order: { amount: finalPrice, invoice_number: dokuInvoiceNumber },
      payment: { payment_due_date: 60 },
      customer: { name: customerName, email: customerEmail },
    };
    const payloadString = JSON.stringify(payload);

    const digest = generateDigest(payloadString);
    const signature = generateDokuSignature({
      clientId: dokuConfig.clientId,
      secretKey: dokuConfig.secretKey,
      requestId,
      requestTimestamp,
      requestTarget,
      digest,
    });

    const baseUrl = dokuConfig.isSandbox ? 'https://api-sandbox.doku.com' : 'https://api.doku.com';
    
    const dokuResponse = await fetch(`${baseUrl}${requestTarget}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': dokuConfig.clientId,
        'Request-Id': requestId,
        'Request-Timestamp': requestTimestamp,
        'Request-Target': requestTarget,
        'Digest': digest,
        'Signature': signature,
      },
      body: payloadString,
    });

    const dokuData = await dokuResponse.json();

    if (!dokuResponse.ok) {
      console.error('DOKU API Error:', dokuData);
      const errorMessage = dokuData?.error?.message || 'Gagal menghubungi server pembayaran DOKU.';
      return NextResponse.json(
        { error: `Gagal pembayaran DOKU: ${errorMessage}` },
        { status: 500 }
      );
    }

    const dokuPaymentUrl = dokuData.response?.payment?.url;

    if (!dokuPaymentUrl) {
      return NextResponse.json(
        { error: 'URL Pembayaran DOKU tidak ditemukan dari respons.' },
        { status: 500 }
      );
    }

    // Create Order with PENDING status
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        totalAmount: finalPrice,
        discountAmount: validDiscount,
        couponCode: couponCode || null,
        status: 'PENDING',
        productId: product.id,
        dokuInvoiceNumber,
        dokuPaymentUrl,
      },
    });

    // Increment coupon used count if used
    if (couponCode) {
      try {
        await prisma.coupon.update({
          where: { code: couponCode.toUpperCase() },
          data: { usedCount: { increment: 1 } },
        });
      } catch (err) {
        console.warn('Coupon usage increment failed:', err);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      amount: order.totalAmount,
      dokuInvoiceNumber: order.dokuInvoiceNumber,
      dokuPaymentUrl: order.dokuPaymentUrl,
      isSandbox: dokuConfig.isSandbox,
    });
  } catch (error) {
    console.error('Error creating DOKU order:', error);
    return NextResponse.json(
      { error: 'Gagal membuat pesanan transaksi DOKU.' },
      { status: 500 }
    );
  }
}
