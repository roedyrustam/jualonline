import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Masukkan nomor pesanan (DKU-...) atau alamat email.' },
        { status: 400 }
      );
    }

    const trimmedQuery = query.trim();

    // Find orders matching orderNumber OR customerEmail
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { orderNumber: { equals: trimmedQuery } },
          { customerEmail: { equals: trimmedQuery } },
          { dokuInvoiceNumber: { equals: trimmedQuery } },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    if (orders.length === 0) {
      return NextResponse.json(
        { error: 'Pesanan tidak ditemukan dengan kata kunci tersebut.' },
        { status: 404 }
      );
    }

    // Enrich orders with product & token info
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const product = await prisma.product.findUnique({
          where: { id: order.productId },
        });

        let downloadToken = await prisma.downloadToken.findFirst({
          where: { orderId: order.id },
        });

        // Auto generate download token if paid but token missing
        if (!downloadToken && order.status === 'PAID' && product) {
          const tokenString = crypto.randomBytes(24).toString('hex');
          const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
          downloadToken = await prisma.downloadToken.create({
            data: {
              token: tokenString,
              orderId: order.id,
              productId: product.id,
              expiresAt,
              downloadCount: 0,
              maxDownloads: 10,
            },
          });
        }

        return {
          id: order.id,
          orderNumber: order.orderNumber,
          dokuInvoiceNumber: order.dokuInvoiceNumber,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          totalAmount: order.totalAmount,
          status: order.status,
          createdAt: order.createdAt,
          productTitle: product?.title || 'Produk Digital',
          productCategory: product?.category || 'ASSET',
          productPreview: product?.previewImage || '',
          downloadToken: downloadToken?.token || null,
          tokenExpiresAt: downloadToken?.expiresAt || null,
        };
      })
    );

    return NextResponse.json({ success: true, orders: enrichedOrders });
  } catch (error) {
    console.error('Error tracking order:', error);
    return NextResponse.json(
      { error: 'Gagal melakukan pencarian pesanan.' },
      { status: 500 }
    );
  }
}
