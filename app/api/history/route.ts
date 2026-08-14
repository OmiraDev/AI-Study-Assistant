import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import Summary from "../../../models/Summary";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Database එකෙන් සියලුම සාරාංශ ලබා ගැනීම (අලුත්ම ඒවා මුලින් එන ලෙස)
    const summaries = await Summary.find({ }as any).sort({ createdAt: -1 });
    
    return NextResponse.json({ summaries });
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return NextResponse.json({ error: "Failed to fetch summaries" }, { status: 500 });
  }
}