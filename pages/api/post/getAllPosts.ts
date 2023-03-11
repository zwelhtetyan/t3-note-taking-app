import { prisma } from '@/lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const allPosts = await prisma.post.findMany({
        include: { author: true },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(allPosts);
    } catch (error) {
      console.log(error);
    }
  }
}
