import dbConnect from '@/lib/dbConnect';
import Profile from '@/models/Profile';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import ClientPage from './ClientPage';

// Force dynamic behavior since we are fetching data that might change
export const dynamic = 'force-dynamic';

export default async function Home() {
  await dbConnect();

  // Fetch data in parallel
  const [profileDocs, projectDocs, skillDocs] = await Promise.all([
    Profile.findOne().lean(),
    Project.find().populate('skills').lean(),
    Skill.find().lean()
  ]);

  // Serialization helper to convert _id and dates to strings
  const serialize = (obj: any): any => {
    return JSON.parse(JSON.stringify(obj));
  };

  const profile = profileDocs ? serialize(profileDocs) : null;
  const projects = projectDocs ? serialize(projectDocs) : [];
  const skills = skillDocs ? serialize(skillDocs) : [];

  return (
    <ClientPage
      initialProfile={profile}
      initialProjects={projects}
      initialSkills={skills}
    />
  );
}