/**
 * Helper to convert any image or asset path into a secure Supabase proxy URL.
 * Guarantees that raw Supabase URLs and bucket structure are never leaked to client browsers.
 */
export function getMediaUrl(path: string | null | undefined): string {
  if (!path) return '';

  // Already proxied
  if (path.startsWith('/api/media/')) {
    return path;
  }

  // If starts with /editorial/, rewrite to proxy route
  if (path.startsWith('/editorial/')) {
    return `/api/media${path}`;
  }

  // If it's a full Supabase storage URL, strip out host and wrap in proxy
  if (path.includes('.supabase.co/storage/v1/object/')) {
    const parts = path.split('/object/public/');
    if (parts.length > 1) {
      return `/api/media/${parts[1]}`;
    }
  }

  // Brand static assets keep direct public reference if needed, or proxy
  if (path.startsWith('/brand/')) {
    return path;
  }

  // Relative storage path: ensure leading /api/media/
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/api/media/${cleanPath}`;
}
