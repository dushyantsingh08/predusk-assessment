import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  level: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Expert'], 
    required: true 
  },
}, { timestamps: true });

const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;
