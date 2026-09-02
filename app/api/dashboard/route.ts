import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import Summary from "../../../models/Summary";
import Quiz from "../../../models/Quiz";


export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    
    const totalSummaries = await Summary.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();

    
    const recentActivities = await Summary.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("originalText createdAt"); 

    return NextResponse.json({
      summaries: totalSummaries,
      quizzes: totalQuizzes,
      recent: recentActivities,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}