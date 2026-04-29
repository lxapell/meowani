interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Builds a proxied image URL for the application's image transformation endpoint.
 *
 * @param src - Source path or absolute URL. If `src` starts with `/`, it is prefixed with the origin `https://alpha.meowani.site`.
 * @param width - Desired output width (used as the `w` query parameter).
 * @param quality - Optional image quality value; when provided it is added as the `q` query parameter.
 * @returns A `/~/image` path containing `url`, `w`, and optionally `q` query parameters that reference the transformed image.
 */
export default function customImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const baseUrl = "https://alpha.meowani.site";
  const fullSrc = src.startsWith("/") ? `${baseUrl}${src}` : src;

  const params = new URLSearchParams();
  params.set("url", fullSrc);
  params.set("w", width.toString());
  if (quality) params.set("q", quality.toString());

  return `/~/image?${params.toString()}`;
}
