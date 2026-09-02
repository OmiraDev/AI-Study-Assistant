import { NextResponse } from "next/server";
const pdf = require("pdf-parse"); // 

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    const pdfData = await pdf(buffer);
    const text = pdfData.text;

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Failed to process document" }, { status: 500 });
  }
}