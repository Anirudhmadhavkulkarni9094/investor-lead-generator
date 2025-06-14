import { NextRequest } from 'next/server';
import connect from '@/lib/mongodb';
import ButtonClick from '@/models/ButtonClick';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || '';
  await connect();
  try {
    await ButtonClick.create({ ip });
    const count = await ButtonClick.countDocuments();
    return new Response(JSON.stringify({ count }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error tracking button click' }), { status: 500 });
  }
}
