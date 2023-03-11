import { PostData } from '@/app/create/page';
import { prisma } from '@/lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const postData: PostData = req.body;

    if (!postData.title.trim())
      return res.status(400).json({ message: "Title cant't be blank" });

    try {
      await prisma.post.create({
        data: postData,
        include: { author: true },
      });

      res.status(200).json({ message: 'Post created successfully' });
    } catch (error) {
      console.log(error);
    }
  }
}
