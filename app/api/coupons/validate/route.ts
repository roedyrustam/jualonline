import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { code, originalPrice } = await request.json();

    if (!code || !originalPrice) {
      return NextResponse.json(
        { error: 'Kode kupon dan harga awal harus diisi.' },
        { status: 400 }
      );
    }

    const uppercaseCode = code.trim().toUpperCase();

    const coupon = await prisma.coupon.findUnique({
      where: { code: uppercaseCode },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json(
        { error: 'Kode kupon tidak valid atau sudah tidak aktif.' },
        { status: 404 }
      );
    }

    if (coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json(
        { error: 'Batas penggunaan kupon telah habis.' },
        { status: 400 }
      );
    }

    if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt)) {
      return NextResponse.json(
        { error: 'Masa berlaku kode kupon telah berakhir.' },
        { status: 400 }
      );
    }

    const discountAmount = Math.round((Number(originalPrice) * coupon.discountPercent) / 100);
    const finalPrice = Math.max(0, Number(originalPrice) - discountAmount);

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discountPercent: coupon.discountPercent,
      discountAmount,
      finalPrice,
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json(
      { error: 'Gagal memvalidasi kupon diskon.' },
      { status: 500 }
    );
  }
}
