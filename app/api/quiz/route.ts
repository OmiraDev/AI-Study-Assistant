import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import Quiz from "../../../models/Quiz";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

  
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    
    const prompt = `
      Based on the following text, generate 5 multiple-choice questions.
      Return ONLY a valid JSON array. Do not include markdown formatting like \`\`\`json.
      Each object in the array must have this exact structure:
      {
        "question": "The question text here?",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correctAnswer": "Option 1"
      }
      
      Text:
      ${text}
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    
    const questions = JSON.parse(responseText);

    
    await connectToDatabase();
    
    const newQuiz = await Quiz.create({
      originalText: text,
      questions: questions,
    });

    
    return NextResponse.json({ quiz: newQuiz.questions });
    
  } catch (error) {
    console.error("Quiz API Error:", error);
    return NextResponse.json({ error: "Failed to generate or save quiz" }, { status: 500 });
  }
}