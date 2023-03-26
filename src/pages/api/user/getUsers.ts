import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Request method not supported!" });
  }

  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
      },
    });
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
