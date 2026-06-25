export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    if (!page) {
      return NextResponse.json({ files: [] });
    }

    const pageDir = path.join(process.cwd(), "public", page);
    
    if (!fs.existsSync(pageDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = fs.readdirSync(pageDir);
    
    // Filter out hidden files and return only image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return [".png", ".webp", ".jpg", ".jpeg", ".svg"].includes(ext);
    });

    return NextResponse.json({ files: imageFiles });
  } catch (error) {
    console.error("Error reading page assets directory:", error);
    return NextResponse.json({ files: [] });
  }
}
