import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID harus diisi.' }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });

    const totalCount = reviews.length;
    const averageRating =
      totalCount > 0
        ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1))
        : 5.0;

    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        breakdown[r.rating as keyof typeof breakdown]++;
      }
    });

    return NextResponse.json({
      reviews,
      totalCount,
      averageRating,
      breakdown,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil ulasan produk.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, productId, customerName, rating, comment } = body;

    if (!orderId || !productId || !rating || !comment) {
      return NextResponse.json(
        { error: 'Mohon isi semua bidang parameter ulasan.' },
        { status: 400 }
      );
    }

    // Verify paid order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.status !== 'PAID') {
      return NextResponse.json(
        { error: 'Ulasan hanya dapat diberikan untuk transaksi yang telah LUNAS / PAID.' },
        { status: 403 }
      );
    }

    // Check if already reviewed
    const existingReview = await prisma.review.findFirst({
      where: { orderId },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: 'Anda telah mengirimkan ulasan untuk pesanan ini sebelumnya.' },
        { status: 400 }
      );
    }

    const newReview = await prisma.review.create({
      data: {
        productId,
        orderId,
        customerName: customerName || order.customerName,
        rating: Math.min(5, Math.max(1, Number(rating))),
        comment: comment.trim(),
        isVerified: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Ulasan berhasil disimpan. Terima kasih atas masukan Anda!',
      review: newReview,
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json({ error: 'Gagal menyimpan ulasan.' }, { status: 500 });
  }
}
