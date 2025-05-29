import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

interface UploadResult {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get form data
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const category = formData.get('category') as string || 'general';
    const tags = formData.get('tags') as string || '';

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadResults: UploadResult[] = [];
    const errors: string[] = [];

    // Process each file
    for (const file of files) {
      try {
        // Validate file
        if (!ALLOWED_TYPES.includes(file.type)) {
          errors.push(`${file.name}: Invalid file type. Only JPEG, PNG, and WebP allowed.`);
          continue;
        }

        if (file.size > MAX_FILE_SIZE) {
          errors.push(`${file.name}: File too large. Maximum size is 10MB.`);
          continue;
        }

        // Generate unique filename
        const fileExtension = file.name.split('.').pop();
        const uniqueFilename = `${uuidv4()}.${fileExtension}`;
        const blobPath = `baseline-assets/${decoded.userId}/${category}/${uniqueFilename}`;

        // Upload to Vercel Blob
        const blob = await put(blobPath, file, {
          access: 'public',
          addRandomSuffix: false,
        });

        // Store metadata in database
        const baselineAsset = await prisma.baselineAsset.create({
          data: {
            id: uuidv4(),
            tenantId: decoded.userId,
            category,
            name: file.name,
            fileUrl: blob.url,
            assetType: file.type,
            tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
            metadata: {
              originalName: file.name,
              size: file.size,
              uploadedAt: new Date().toISOString(),
              blobPath,
            }
          }
        });

        uploadResults.push({
          id: baselineAsset.id,
          url: blob.url,
          filename: file.name,
          size: file.size,
          type: file.type,
        });

      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
        errors.push(`${file.name}: Upload failed`);
      }
    }

    return NextResponse.json({
      success: true,
      uploaded: uploadResults,
      errors: errors.length > 0 ? errors : undefined,
      summary: {
        total: files.length,
        successful: uploadResults.length,
        failed: errors.length,
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to list assets
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const where = {
      tenantId: decoded.userId,
      ...(category && { category }),
    };

    const [assets, total] = await Promise.all([
      prisma.baselineAsset.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.baselineAsset.count({ where }),
    ]);

    return NextResponse.json({
      assets,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    });

  } catch (error) {
    console.error('List assets error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}