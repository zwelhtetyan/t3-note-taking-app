import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "~/lib/prismaClient";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supportedMethods = ["GET", "PUT", "DELETE"];

  if (req.method && !supportedMethods.includes(req.method)) {
    return res.status(405).json({ message: "Method not supported" });
  }

  if (req.method === "GET") {
    // show single post
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  const { id: postId, userId } = req.query;

  if (session.user?.id !== userId) {
    return res
      .status(403)
      .json({ message: "You can only manage your own posts" });
  }

  if (req.method == "DELETE") {
    try {
      await prisma.post.delete({ where: { id: postId as string } });
      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
