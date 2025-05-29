import { NextRequest, NextResponse } from 'next/server';
import { imageProcessor, MetaAdFormat, META_AD_FORMATS } from '@/services/image-processing';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

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

    const { assetId, formats, options } = await request.json();

    if (!assetId) {
      return NextResponse.json({ error: 'Asset ID required' }, { status: 400 });
    }

    // Get the baseline asset
    const baselineAsset = await prisma.baselineAsset.findFirst({
      where: {
        id: assetId,
        tenantId: decoded.userId,
      }
    });

    if (!baselineAsset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }

    // Download the original image
    const imageResponse = await fetch(baselineAsset.fileUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to download original image');
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Validate image for Meta
    const validation = await imageProcessor.validateForMeta(imageBuffer);
    if (!validation.valid) {
      return NextResponse.json({
        error: 'Image validation failed',
        details: validation.errors,
      }, { status: 400 });
    }

    // Process image for specified formats (or all formats if none specified)
    const formatsToProcess = formats && formats.length > 0 
      ? formats 
      : Object.keys(META_AD_FORMATS) as MetaAdFormat[];

    const processedImages = [];

    for (const format of formatsToProcess) {
      try {
        const processed = await imageProcessor.processForFormat(
          imageBuffer,
          format as MetaAdFormat,
          baselineAsset.name.split('.')[0], // Remove extension
          decoded.userId,
          options || {}
        );

        // Store processed image metadata in database
        const contentAsset = await prisma.contentAsset.create({
          data: {
            id: uuidv4(),
            baselineAssetId: baselineAsset.id,
            tenantId: decoded.userId,
            assetType: 'processed_image',
            fileUrl: processed.url,
            format: format,
            dimensions: {
              width: processed.width,
              height: processed.height,
            },
            metadata: {
              originalAssetId: assetId,
              processingOptions: options,
              aspectRatio: META_AD_FORMATS[format as MetaAdFormat].aspectRatio,
              blobPath: processed.blobPath,
              fileSize: processed.size,
              processedAt: new Date().toISOString(),
            }
          }
        });

        processedImages.push({
          id: contentAsset.id,
          format,
          url: processed.url,
          width: processed.width,
          height: processed.height,
          size: processed.size,
          aspectRatio: META_AD_FORMATS[format as MetaAdFormat].aspectRatio,
          name: META_AD_FORMATS[format as MetaAdFormat].name,
        });

      } catch (error) {
        console.error(`Failed to process format ${format}:`, error);
      }
    }

    // Create thumbnail for the original
    const thumbnailBuffer = await imageProcessor.createThumbnail(imageBuffer);
    // Note: You'd upload this thumbnail to blob storage too

    return NextResponse.json({
      success: true,
      originalAsset: {
        id: baselineAsset.id,
        url: baselineAsset.fileUrl,
        name: baselineAsset.name,
      },
      processedImages,
      validation: {
        warnings: validation.warnings,
      },
      summary: {
        totalFormats: formatsToProcess.length,
        successful: processedImages.length,
        failed: formatsToProcess.length - processedImages.length,
      }
    });

  } catch (error) {
    console.error('Image processing error:', error);
    return NextResponse.json(
      { error: 'Processing failed' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve processed images
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
    const baselineAssetId = searchParams.get('baselineAssetId');
    const format = searchParams.get('format');

    const where: any = {
      tenantId: decoded.userId,
      assetType: 'processed_image',
    };

    if (baselineAssetId) {
      where.baselineAssetId = baselineAssetId;
    }

    if (format) {
      where.format = format;
    }

    const processedAssets = await prisma.contentAsset.findMany({
      where,
      include: {
        baselineAsset: {
          select: {
            id: true,
            name: true,
            category: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      assets: processedAssets.map(asset => ({
        id: asset.id,
        format: asset.format,
        url: asset.fileUrl,
        dimensions: asset.dimensions,
        baselineAsset: asset.baselineAsset,
        createdAt: asset.createdAt,
        metadata: asset.metadata,
      }))
    });

  } catch (error) {
    console.error('Get processed images error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve processed images' },
      { status: 500 }
    );
  }
}