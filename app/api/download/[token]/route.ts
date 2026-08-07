import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const tokenRecord = await prisma.downloadToken.findUnique({
      where: { token },
      include: { product: true, order: true },
    });

    if (!tokenRecord) {
      return new NextResponse('Token unduhan tidak valid.', { status: 404 });
    }

    // Check expiration
    if (new Date() > new Date(tokenRecord.expiresAt)) {
      return new NextResponse('Masa berlaku link unduhan telah berakhir (Expired 24 jam).', {
        status: 410,
      });
    }

    // Check download limit
    if (tokenRecord.downloadCount >= tokenRecord.maxDownloads) {
      return new NextResponse('Batas maksimum jumlah unduhan telah tercapai.', {
        status: 429,
      });
    }

    // Locate digital file on local filesystem
    const relativeFilePath = tokenRecord.product.digitalFile;
    const absoluteFilePath = path.join(process.cwd(), relativeFilePath);

    if (!fs.existsSync(absoluteFilePath)) {
      return new NextResponse('File digital produk tidak ditemukan di server.', {
        status: 404,
      });
    }

    // Increment download count
    await prisma.downloadToken.update({
      where: { id: tokenRecord.id },
      data: { downloadCount: tokenRecord.downloadCount + 1 },
    });

    const fileBuffer = fs.readFileSync(absoluteFilePath);
    const fileName = path.basename(absoluteFilePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error serving protected file:', error);
    return new NextResponse('Terjadi kesalahan saat mengunduh file.', { status: 500 });
  }
}
