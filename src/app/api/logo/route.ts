import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const logoDir = path.join(process.cwd(), "public", "logo");
    
    if (!fs.existsSync(logoDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = fs.readdirSync(logoDir);
    
    // Filter out .gitkeep and return only image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return [".png", ".webp", ".jpg", ".jpeg", ".svg"].includes(ext);
    });

    return NextResponse.json({ files: imageFiles });
  } catch (error) {
    console.error("Error reading logo directory:", error);
    return NextResponse.json({ files: [] });
  }
}
