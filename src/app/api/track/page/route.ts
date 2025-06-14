import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PageView from '@/models/PageView';

export async function POST(req: NextRequest) {
  await dbConnect();

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    'unknown';

  try {
    const exists = await PageView.findOne({ ip });
    if (!exists) {
      await PageView.create({ ip });
    }

    const total = await PageView.countDocuments();
    return NextResponse.json({ total });
  } catch (err) {
    console.error('Tracking error:', err);
    return NextResponse.json({ error: 'Error tracking page view' }, { status: 500 });
  }
}
