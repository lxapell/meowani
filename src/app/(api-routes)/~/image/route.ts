import { NextResponse, URLPattern, type NextRequest } from "next/server";
import sharp from "sharp";
import nextConfig from "../../../../../next.config";

interface remotePatterns {
  protocol?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
}

/**
 * Determine whether a given image URL is allowed as a remote source.
 *
 * @param url - The image URL to validate; may be an absolute URL or a path beginning with `/`
 * @param currentOrigin - The app origin;
 * @returns `true` if the URL is allowed according to the configured remotePatterns or is a local path, `false` otherwise.
 */
function isValidUrl(url: string, currentOrigin?: string): boolean {
  try {
    if (url.startsWith("/")) return true;

    const parsed = new URL(url);

    // const devOrigins = nextConfig.allowedDevOrigins;
    // if (!devOrigins)
    // console.log(`${parsed.hostname} against ${currentOrigin}`);
    if (currentOrigin && parsed.origin === currentOrigin) return true;

    const patterns = nextConfig.images?.remotePatterns as remotePatterns[];

    if (!patterns || patterns.length === 0) {
      return false;
    }

    for (const pattern of patterns) {
      const urlPattern = new URLPattern({
        protocol: pattern.protocol,
        hostname: pattern.hostname,
        port: pattern.port,
        pathname: pattern.pathname,
      });

      if (urlPattern.test(url)) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Serves an optimized image for the requested source URL and width.
 *
 * Fetches the source image (allowlisting remote URLs), returns SVGs unchanged, and for raster images produces a resized/converted image according to query parameters (`w`, `q`, `fm`) and client `Accept` headers.
 *
 * @returns A NextResponse containing the image bytes and appropriate `Content-Type` and `Cache-Control` headers. May return 400 for missing/invalid parameters, 403 for forbidden remote domains, or 500 for internal processing errors.
 */
export async function GET(request: NextRequest) {
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  const currentOrigin = `${protocol}://${host}`;
  const { searchParams } = new URL(request.url);
  const src = searchParams.get("url");
  const width = searchParams.get("w");
  const quality = searchParams.get("q");
  const format = searchParams.get("fm");

  if (!src || !width) {
    return new NextResponse("Missing url or width parameter", { status: 400 });
  }

  let imageUrl: string;
  if (src.startsWith("/")) {
    imageUrl = `${protocol}://${host}${src}`;
  } else if (src.startsWith("http://") || src.startsWith("https://")) {
    if (!isValidUrl(src, currentOrigin)) {
      return new NextResponse("Forbidden remote domain", { status: 403 });
    }
    imageUrl = src;
  } else {
    return new NextResponse("Invalid image source", { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return new NextResponse("Failed to fetch image", {
        status: response.status,
      });
    }
    const contentType = response.headers.get("content-type") || "image/jpeg";
    const isSVG =
      contentType.includes("image/svg+xml") ||
      imageUrl.toLowerCase().includes(".svg");

    if (isSVG) {
      const svgBuffer = Buffer.from(await response.arrayBuffer());
      return new NextResponse(svgBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // at the moment I'm thinking of rewriting this endpoint into rust for faster optimization so for now because this is painfully slow so for now I'm going to just return what was passed

    const isProd = process.env.NODE_ENV === "production";
    const isDev = process.env.NODE_ENV !== "production";
    if (isProd || isDev) {
      const imgBuffer = Buffer.from(await response.arrayBuffer());
      return new NextResponse(imgBuffer, {
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
      });
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    let pipeline = sharp(buffer);

    const widthNum = parseInt(width, 10);
    if (!isNaN(widthNum) && widthNum > 0) {
      pipeline = pipeline.resize({ width: widthNum, withoutEnlargement: true });
    }

    const qualityNum = parseInt(quality || "75", 10);

    let outputFormat: keyof sharp.FormatEnum;
    let outputContentType: string;

    if (format && ["webp", "avif", "png", "jpg", "jpeg"].includes(format)) {
      outputFormat = format as keyof sharp.FormatEnum;
      outputContentType = `image/${format}`;
    } else {
      const accept = request.headers.get("accept") || "";
      if (accept.includes("image/avif")) {
        outputFormat = "avif";
        outputContentType = "image/avif";
      } else if (accept.includes("image/webp")) {
        outputFormat = "webp";
        outputContentType = "image/webp";
      } else {
        outputFormat = contentType.includes("png") ? "png" : "jpeg";
        outputContentType = contentType;
      }
    }
    pipeline = pipeline.toFormat(outputFormat, { quality: qualityNum });

    const optimizedBuffer = await pipeline.toBuffer();

    return new NextResponse(optimizedBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": outputContentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("[ImageOptimizer] Optimization error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
