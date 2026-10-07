import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force nodejs runtime for streaming and filesystem access
export const runtime = 'nodejs';

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

/**
 * Media Proxy Route:
 * Serves media assets from Supabase Storage buckets through a secure proxy URL.
 * Ensures raw Supabase URLs and bucket structures are NEVER exposed to client browsers.
 *
 * Example usage:
 * <img src="/api/media/editorial/hero-model.jpg" />
 * <img src="/api/media/derivatives/abc-123/640w.webp" />
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { path?: string[] } }
) {
  const pathSegments = params.path;
  if (!pathSegments || pathSegments.length === 0) {
    return new NextResponse('Path parameter missing', { status: 400 });
  }

  // Sanitize path segments to prevent directory traversal
  const cleanSegments = pathSegments.map((s) => s.replace(/\.\./g, ''));
  const fullPath = cleanSegments.join('/');

  // Determine bucket: default is 'media-public'
  let bucket = 'media-public';
  let objectPath = fullPath;

  if (cleanSegments[0] === 'media-public' || cleanSegments[0] === 'media-originals') {
    bucket = cleanSegments[0];
    objectPath = cleanSegments.slice(1).join('/');
  }

  const ext = path.extname(objectPath).toLowerCase();
  const contentType = MIME_MAP[ext] || 'application/octet-stream';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 1. Try fetching from Supabase Storage Bucket
  if (supabaseUrl) {
    try {
      const storageUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${objectPath}`;
      const headers: Record<string, string> = {};
      if (anonKey) {
        headers['apikey'] = anonKey;
        headers['Authorization'] = `Bearer ${anonKey}`;
      }

      const res = await fetch(storageUrl, {
        headers,
        next: { revalidate: 86400 }, // Cache on edge/Next ISR for 24h
      });

      if (res.ok) {
        const imageBuffer = await res.arrayBuffer();
        return new NextResponse(imageBuffer, {
          status: 200,
          headers: {
            'Content-Type': res.headers.get('content-type') || contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'X-Media-Source': 'supabase-storage-proxy',
          },
        });
      }
    } catch {
      // Fallback silently if Supabase connection fails or asset is pending sync
    }
  }

  // 2. Resilience Fallback: check local public folder (e.g. public/editorial/...)
  try {
    const localFilePath = path.join(process.cwd(), 'public', fullPath);
    if (fs.existsSync(localFilePath) && fs.statSync(localFilePath).isFile()) {
      const fileBuffer = fs.readFileSync(localFilePath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400',
          'X-Media-Source': 'local-fallback',
        },
      });
    }
  } catch {
    // Continue to 404
  }

  return new NextResponse('Media asset not found', { status: 404 });
}
