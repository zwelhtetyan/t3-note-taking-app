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
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
  } catch (error) {}
}
