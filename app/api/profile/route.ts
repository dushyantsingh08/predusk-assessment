import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Profile from '@/models/Profile';
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  bio: z.string().min(1),
  education: z.array(z.object({
    degree: z.string(),
    school: z.string(),
    year: z.string(),
  })),
  experience: z.array(z.object({
    role: z.string(),
    company: z.string(),
    period: z.string(),
    description: z.string(),
  })).optional(),
  socialLinks: z.object({
    github: z.string().optional(),
    linkedin: z.string().optional(),
    portfolio: z.string().optional(),
  }),
});

export async function GET() {
  await dbConnect();
  try {
    const profile = await Profile.findOne({});
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const validatedData = profileSchema.parse(body);
    
    // maintain single profile rule: delete others if exist (simple logic for now)
    // or just check if one exists
    const existing = await Profile.findOne({});
    if (existing) {
        return NextResponse.json({ error: 'Profile already exists. Use PATCH to update.' }, { status: 400 });
    }

    const profile = await Profile.create(validatedData);
    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const validatedData = profileSchema.partial().parse(body);

    const profile = await Profile.findOneAndUpdate({}, validatedData, { new: true });
    
    if (!profile) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
     if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
