import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        dokuInvoiceNumber: true,
        totalAmount: true,
        updatedAt: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Pesanan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({
      status: order.status,
      orderNumber: order.orderNumber,
      dokuInvoiceNumber: order.dokuInvoiceNumber,
      amount: order.totalAmount,
      updatedAt: order.updatedAt,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengecek status pesanan' }, { status: 500 });
  }
}
