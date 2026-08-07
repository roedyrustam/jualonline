import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, description, price, category, previewImage, digitalFile, features, isPublished } = body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(price && { price: Number(price) }),
        ...(category && { category }),
        ...(previewImage && { previewImage }),
        ...(digitalFile && { digitalFile }),
        ...(features && { features: JSON.stringify(features) }),
        ...(isPublished !== undefined && { isPublished }),
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memperbarui produk' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: 'Produk berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus produk' }, { status: 500 });
  }
}
