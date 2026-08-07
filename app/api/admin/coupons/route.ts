import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(coupons);
  } catch {
    return NextResponse.json({ error: 'Gagal mengambil kupon' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { code, discountPercent, maxUses } = body;

    if (!code || !discountPercent) {
      return NextResponse.json({ error: 'Kode kupon dan diskon harus diisi.' }, { status: 400 });
    }

    const newCoupon = await prisma.coupon.create({
      data: {
        code: code.trim().toUpperCase(),
        discountPercent: Number(discountPercent),
        maxUses: Number(maxUses || 100),
        isActive: true,
      },
    });

    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Kode kupon sudah ada atau gagal dibuat.' }, { status: 400 });
  }
}
