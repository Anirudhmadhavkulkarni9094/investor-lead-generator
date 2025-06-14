import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import ButtonClick from '@/models/ButtonClick';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  await dbConnect();

  try {
    await ButtonClick.create({ ip });
    const count = await ButtonClick.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Error tracking button click' });
  }
}
