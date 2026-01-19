import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';

export async function GET() {
  await dbConnect();
  try {
    const aggregation = await Project.aggregate([
      { $unwind: '$skills' },
      { $group: { _id: '$skills', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'skills',
          localField: '_id',
          foreignField: '_id',
          as: 'skillDetails',
        },
      },
      { $unwind: '$skillDetails' },
      {
        $project: {
          _id: 1,
          count: 1,
          name: '$skillDetails.name',
          level: '$skillDetails.level',
        },
      },
    ]);

    return NextResponse.json(aggregation, { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch top skills' }, { status: 500 });
  }
}
