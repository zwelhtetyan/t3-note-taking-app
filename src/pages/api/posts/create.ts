import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "~/lib/prismaClient";
import type { User } from "~/types";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not supported" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { content } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: { content: content as string, authorId: (session.user as User).id },
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
