import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
import '@/models/Skill'; // Ensure Skill model is registered for population


export async function GET(req: NextRequest) {
  await dbConnect();
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get('q');

  try {
    let query = {};
    if (q) {
      // Simple regex search for now
      query = {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
        ],
      };
    }

    const projects = await Project.find(query).populate('skills');
  
     return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Failed to search projects' }, { status: 500 });
  }
}
