// pages/api/storeVideos.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { videos } = req.body;

    try {
      await prisma.video.createMany({
        data: videos,
      });

      res.status(200).json({ message: 'Videos stored successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to store videos' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
