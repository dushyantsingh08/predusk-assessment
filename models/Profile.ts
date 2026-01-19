import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEducation {
  degree: string;
  school: string;
  year: string;
}

export interface IExperience {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date | null;
  description: string;
}

export interface ISocialLinks {
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface IProfile extends Document {
  name: string;
  email: string;
  bio: string;
  education: IEducation[];
  experience: IExperience[];
  socialLinks: ISocialLinks;
}

const ProfileSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, required: true },
  education: [{
    degree: { type: String, required: true },
    school: { type: String, required: true },
    year: { type: String, required: true },
  }],
  experience: [{
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true },
  }],
  socialLinks: {
    github: String,
    linkedin: String,
    portfolio: String,
  },
}, { timestamps: true });

const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
