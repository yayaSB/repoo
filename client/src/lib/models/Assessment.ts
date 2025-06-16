import mongoose, { Schema, Document } from 'mongoose';

interface IAssessment extends Document {
  name: string;
  description: string;
}

const AssessmentSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true } 
);

export default mongoose.models.Assessment || mongoose.model<IAssessment>('Assessment', AssessmentSchema);
