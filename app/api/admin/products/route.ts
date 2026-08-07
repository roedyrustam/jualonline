import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data produk' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, description, price, category, previewImage, digitalFile, features } = body;

    if (!title || !slug || !price || !category) {
      return NextResponse.json({ error: 'Mohon isi semua bidang wajib.' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        slug,
        description: description || '',
        price: Number(price),
        category,
        previewImage: previewImage || '/uploads/preview-template-1.svg',
        digitalFile: digitalFile || 'protected-downloads/aesthetic-studio-portfolio-v1.zip',
        features: JSON.stringify(features || []),
        isPublished: true,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Gagal menambah produk baru.' }, { status: 500 });
  }
}
