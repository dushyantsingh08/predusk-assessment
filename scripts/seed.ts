
import mongoose from 'mongoose';
import Profile from '../models/Profile';
import Skill from '../models/Skill';
import Project from '../models/Project';
import WorkExperience from '../models/WorkExperience';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env');
  process.exit(1);
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await WorkExperience.deleteMany({});

    console.log('Cleared existing data');

    // Create Profile
const profile = await Profile.create({
  name: 'Dushyant Singh Rao',
  email: 'dushyantsinghrao28@gmail.com',
  bio: 'Computer Science student at NIT Delhi with a strong foundation in Full-Stack development and Machine Learning. Passionate about building systems that solve real-world efficiency problems.',
  education: [
    {
      degree: 'Bachelor of Technology in Computer Science',
      school: 'National Institute of Technology, Delhi',
      year: '2023 – 2027',
    },
  ],
  experience: [
    {
    company: 'National Institute of Technology, Delhi',
    position: 'ML Research Engineer',
    startDate: new Date('2026-01-15'),
    endDate: null,
    description: 'Conducting research on advanced machine learning architectures and optimization techniques. Focused on developing scalable ML pipelines and implementing state-of-the-art algorithms for complex data analysis.',
  },
  {
    company: 'NIT Delhi',
    position: 'B.Tech Student / Developer',
    startDate: new Date('2023-08-01'),
    endDate: new Date('2026-01-14'),
    description: 'Academic focus on Algorithms, Data Structures, and Database Management. Solved 350+ problems across platforms and successfully built full-stack solutions including a Smart Electricity Billing system.',
  }
  ],
  socialLinks: {
    github: 'https://github.com/dushyantsingh08', // Replace with your actual handle
    linkedin: 'https://www.linkedin.com/in/dushyant-singh-rao-1246a22a1/',
    portfolio: '#', 
  },
});

console.log('Created Profile for Dushyant');

// Create Skills
const skillsData = [
  { name: 'JavaScript', level: 'Expert' },
  { name: 'TypeScript', level: 'Expert' },
  { name: 'Python', level: 'Expert' },
  { name: 'C++', level: 'Expert' },
  { name: 'React.js', level: 'Expert' },
  { name: 'Node.js', level: 'Expert' },
  { name: 'Express', level: 'Intermediate' },
  { name: 'MongoDB', level: 'Intermediate' },
  { name: 'SQL', level: 'Intermediate' },
  { name: 'Prisma', level: 'Intermediate' },
  { name: 'Tailwind', level: 'Expert' },
  { name: 'Docker', level: 'Beginner' },
  { name: 'Scikit-learn', level: 'Intermediate' },
  { name: 'nextjs', level: 'Intermediate' },
];

const skills = await Skill.create(skillsData);
console.log(`Created ${skills.length} Skills`);

const getSkillId = (name: string) => skills.find((s) => s.name === name)?._id;

// Create Projects
const projectsData = [
  {
    title: 'Smart Electricity Billing System',
    description: 'Developed a web-based electricity billing platform for city-wide usage. Automated bill generation from digital meter readings and built an admin dashboard to track usage in real-time. Reduced administrative effort by 70%.',
    liveUrl: '#',
    repoUrl: '#',
    skills: [getSkillId('React.js'), getSkillId('Node.js'), getSkillId('SQL'), getSkillId('Tailwind')],
  },
  {
    title: 'Students’ Performance Analysis and Prediction',
    description: 'End-to-end ML pipeline predicting student performance with 89.4% R² accuracy. Implemented modular components for data ingestion, preprocessing, and model training using GridSearchCV.',
    liveUrl: '#',
    repoUrl: 'https://github.com/dushyantsingh08/student-analysis',
    skills: [getSkillId('Python'), getSkillId('Scikit-learn')],
  },
  {
    title: 'Water Distribution System',
    description: 'Interactive simulation tool for optimizing water networks using MST algorithms and Bernoulli’s theorem for leakage detection. Reduced redundant pipe usage by 15%.',
    liveUrl: '#',
    repoUrl: 'https://github.com/dushyantsingh08/water-dist',
    skills: [getSkillId('React.js'), getSkillId('JavaScript')],
  },
];

const sanitisedProjects = projectsData.map(p => ({
    ...p,
    skills: p.skills.filter(id => id !== undefined)
}));

await Project.create(sanitisedProjects);
console.log(`Created ${sanitisedProjects.length} Projects`);

// Create Work Experience / Extracurricular
await WorkExperience.create([
  {
    company: 'NIT Delhi',
    position: 'B.Tech Student / Developer',
    startDate: new Date('2023-08-01'),
    description: 'Focusing on Algorithms, Data Structures, and Database Management. Solved 350+ problems across platforms and participated in CodeOn.',
  },
]);

    console.log('Created Work Experience');
    console.log('Seeding completed successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
