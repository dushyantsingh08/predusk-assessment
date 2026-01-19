import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
import Skill from '@/models/Skill';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ skillName: string }> } // Correct type for Next.js 15+ params
) {
  const { skillName } = await params;
  await dbConnect();

  try {
    // Find skill first
    const skill = await Skill.findOne({ name: { $regex: new RegExp(`^${skillName}$`, 'i') } });

    if (!skill) {
      return NextResponse.json([], { status: 200 }); // Return empty if skill not found
    }

    const projects = await Project.find({ skills: skill._id }).populate('skills');
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
