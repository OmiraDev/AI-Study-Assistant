import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";



// .env.local එකේ අපි දාපු API Key එක මෙතනින් ගන්නවා
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // AI මොඩල් එක තෝරාගැනීම (වේගවත්ම model එක)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // AI එකට දෙන විධානය (Prompt)
    const prompt = `Please provide a clear, concise, and easy-to-understand summary of the following text:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const summary = response.text();

    return NextResponse.json({ summary });
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}