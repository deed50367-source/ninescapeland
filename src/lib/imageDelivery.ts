export interface ImageDeliveryOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'origin';
}

/** Resize only supported storage images; keep local/CDN assets and their identity intact. */
export function optimizedStorageImage(source: string, options: ImageDeliveryOptions = {}): string {
  if (!/^https?:\/\//.test(source)) return source;
  const url = new URL(source);
  if (!url.hostname.endsWith('.supabase.co') || !/\/storage\/v1\/(object|render\/image)\/public\//.test(url.pathname)) return source;
  url.pathname = url.pathname.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');
  if (options.width) url.searchParams.set('width', String(options.width));
  if (options.height) url.searchParams.set('height', String(options.height));
  url.searchParams.set('quality', String(options.quality ?? 75));
  url.searchParams.set('format', options.format ?? 'webp');
  return url.toString();
}