interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Create a proxied image URL that points to the application's /~/image transformation endpoint.
 *
 * @param src - Source path or absolute URL of the original image
 * @param width - Desired output width, used as the `w` query parameter
 * @param quality - Optional image quality value; when provided it is added as the `q` query parameter
 * @returns A string path in the form `/~/image?url=<src>&w=<width>[&q=<quality>]`
 */
export default function customImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  // const baseUrl = "https://alpha.meowani.site";
  // const fullSrc = src.startsWith("/") ? `${baseUrl}${src}` : src;
  const fullSrc = src;

  const params = new URLSearchParams();
  params.set("url", fullSrc);
  params.set("w", width.toString());
  if (quality) params.set("q", quality.toString());

  return `/~/image?${params.toString()}`;
}
