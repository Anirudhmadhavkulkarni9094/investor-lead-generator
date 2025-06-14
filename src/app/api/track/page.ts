import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import PageView from '@/models/PageView';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  await dbConnect();

  try {
    const exists = await PageView.findOne({ ip });
    if (!exists) {
      await PageView.create({ ip });
    }
    const total = await PageView.countDocuments();
    res.status(200).json({ total });
  } catch (err) {
    res.status(500).json({ error: 'Error tracking page view' });
  }
}
