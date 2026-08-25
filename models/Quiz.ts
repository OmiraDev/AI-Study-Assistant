import mongoose, { Schema, Document } from "mongoose";


export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}


export interface IQuiz extends Document {
  originalText: string;
  questions: IQuestion[];
  createdAt: Date;
}

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true }
});

const QuizSchema: Schema = new Schema({
  originalText: { type: String, required: true },
  questions: { type: [QuestionSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);