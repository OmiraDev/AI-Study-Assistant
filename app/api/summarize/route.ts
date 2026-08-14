import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import Summary from "../../../models/Summary";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Please provide a clear, concise, and easy-to-understand summary of the following text:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const summaryText = result.response.text();

    
    await connectToDatabase();
    
    const newSummary = await Summary.create({
      originalText: text,
      summaryText: summaryText,
    });

    return NextResponse.json({ summary: newSummary.summaryText });
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to generate or save summary" }, { status: 500 });
  }
}