import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Skill from '@/models/Skill';

export async function GET() {
  await dbConnect();

  try {
    const skills = await Skill.find({}).sort({ name: 1 });
    return NextResponse.json(skills, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch skills:', error);
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}
