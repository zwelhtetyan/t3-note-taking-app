import { prisma } from '@/lib/prismaClient';
import type { NextApiRequest, NextApiResponse } from 'next';

interface UserInfo {
  name: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const userInfo: UserInfo = req.body;

    const name = userInfo.name.trim();
    const email = userInfo.email.trim();
    const password = userInfo.password.trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const alreadyExist = await prisma.user.findUnique({ where: { email } });

    if (alreadyExist) {
      return res.status(409).json({ message: 'User already exist' });
    }

    try {
      await prisma.user.create({ data: { name, email, password } });
      return res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create user' });
    }
  }
}
