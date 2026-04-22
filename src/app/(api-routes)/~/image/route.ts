import { NextResponse, URLPattern, type NextRequest } from "next/server";
import sharp from "sharp";
import nextConfig from "../../../../../next.config";

interface remotePatterns {
  protocol?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);

    if (url.startsWith("/")) return true;

    const patterns = nextConfig.images?.remotePatterns as remotePatterns[];

    if (!patterns || patterns.length === 0) {
      return false;
    }

    for (const pattern in patterns) {
      const urlPattern = new URLPattern({
        protocol: (pattern as remotePatterns).protocol,
        hostname: (pattern as remotePatterns).hostname,
        port: (pattern as remotePatterns).port,
        pathname: (pattern as remotePatterns).pathname,
      });

      if (urlPattern.test("url")) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
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
    const host = request.headers.get("host") || "localhost:300";
    const protocol = host.includes("localhost") ? "http" : "https";
    imageUrl = `${protocol}://${host}${src}`;
  } else if (src.startsWith("http://") || src.startsWith("https://")) {
    if (!isValidUrl(src)) {
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
