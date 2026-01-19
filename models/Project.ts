import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  liveUrl?: string;
  repoUrl?: string;
  skills: mongoose.Types.ObjectId[];
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  liveUrl: { type: String },
  repoUrl: { type: String },
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
}, { timestamps: true });

// Create text index for search
ProjectSchema.index({ title: 'text', description: 'text' });

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
