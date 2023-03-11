import { prisma } from '@/lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const postId = req.query.postId as string;

    try {
      await prisma.post.delete({ where: { id: postId } });

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.log(error);
    }
  }
}
