import mongoose, { Schema, Document } from "mongoose";

export interface ISummary extends Document {
  originalText: string;
  summaryText: string;
  createdAt: Date;
}

const SummarySchema: Schema = new Schema({
  originalText: { 
    type: String, 
    required: true 
  },
  summaryText: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});


export default mongoose.models.Summary || mongoose.model<ISummary>("Summary", SummarySchema);