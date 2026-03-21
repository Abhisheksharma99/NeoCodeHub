import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Set max duration for serverless function
export const maxDuration = 60;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Allowed: jpg, jpeg, png, gif, webp, svg",
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File too large. Maximum size is 5MB" },
        { status: 400 }
      );
    }

    // Convert to base64 data URI (more reliable than stream upload)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "neocodehub/images",
      resource_type: "auto",
      overwrite: true,
    });

    return NextResponse.json(
      { success: true, url: result.secure_url, public_id: result.public_id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

/**
 * Extract Cloudinary public_id from a secure URL.
 */
function extractPublicIdFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;

    let publicIdParts = parts.slice(uploadIndex + 1);

    // Skip version segment (v1234567890)
    if (publicIdParts.length > 0 && /^v\d+$/.test(publicIdParts[0])) {
      publicIdParts = publicIdParts.slice(1);
    }

    const publicIdWithExt = publicIdParts.join("/");
    const lastDotIndex = publicIdWithExt.lastIndexOf(".");
    if (lastDotIndex === -1) return publicIdWithExt;
    return publicIdWithExt.substring(0, lastDotIndex);
  } catch {
    return null;
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, public_id } = body;

    if (!url && !public_id) {
      return NextResponse.json(
        { success: false, error: "URL or public_id is required" },
        { status: 400 }
      );
    }

    let resolvedPublicId: string | null = public_id || null;

    if (!resolvedPublicId && url) {
      if (typeof url === "string" && url.includes("res.cloudinary.com")) {
        resolvedPublicId = extractPublicIdFromUrl(url);
      }
      if (!resolvedPublicId) {
        return NextResponse.json({ success: true });
      }
    }

    if (resolvedPublicId) {
      await cloudinary.uploader.destroy(resolvedPublicId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
