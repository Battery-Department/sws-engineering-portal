import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

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

    const { files } = await request.json();

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: 'No files specified' }, { status: 400 });
    }

    const uploadUrls = [];

    for (const fileInfo of files) {
      const { name, type, size, category = 'general' } = fileInfo;

      // Validate file info
      if (!ALLOWED_TYPES.includes(type)) {
        return NextResponse.json(
          { error: `Invalid file type for ${name}. Only JPEG, PNG, and WebP allowed.` },
          { status: 400 }
        );
      }

      if (size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${name} too large. Maximum size is 10MB.` },
          { status: 400 }
        );
      }

      // Generate unique filename and upload URL
      const fileExtension = name.split('.').pop();
      const uniqueFilename = `${uuidv4()}.${fileExtension}`;
      const blobPath = `baseline-assets/${decoded.userId}/${category}/${uniqueFilename}`;

      // Generate signed upload URL
      const uploadUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/api/assets/direct-upload`;
      
      uploadUrls.push({
        id: uuidv4(),
        filename: name,
        blobPath,
        uploadUrl,
        fields: {
          path: blobPath,
          category,
          originalName: name,
          userId: decoded.userId,
        }
      });
    }

    return NextResponse.json({
      success: true,
      uploadUrls,
    });

  } catch (error) {
    console.error('Upload URL generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}