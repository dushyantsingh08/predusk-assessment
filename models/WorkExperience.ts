import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWorkExperience extends Document {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
}

const WorkExperienceSchema: Schema = new Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String, required: true },
}, { timestamps: true });

const WorkExperience: Model<IWorkExperience> = mongoose.models.WorkExperience || mongoose.model<IWorkExperience>('WorkExperience', WorkExperienceSchema);

export default WorkExperience;
