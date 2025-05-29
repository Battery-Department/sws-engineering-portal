import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const path = formData.get('path') as string;
    const category = formData.get('category') as string;
    const originalName = formData.get('originalName') as string;
    const userId = formData.get('userId') as string;

    if (!file || !path || !category || !originalName || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(path, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    // Store metadata in database
    const baselineAsset = await prisma.baselineAsset.create({
      data: {
        id: uuidv4(),
        tenantId: userId,
        category,
        name: originalName,
        fileUrl: blob.url,
        assetType: file.type,
        tags: [],
        metadata: {
          originalName,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          blobPath: path,
          directUpload: true,
        }
      }
    });

    return NextResponse.json({
      success: true,
      asset: {
        id: baselineAsset.id,
        url: blob.url,
        filename: originalName,
        size: file.size,
        type: file.type,
      }
    });

  } catch (error) {
    console.error('Direct upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}