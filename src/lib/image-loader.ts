interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/*
 * @param {Object} props
 * @param {string} props.src
 * @param {number} props.width
 * @param {number} [props.quality]
 * @returns {string}
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
