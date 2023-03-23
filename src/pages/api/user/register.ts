import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prismaClient";
import { validateEmail } from "~/utils/validateEmail";
import bcrypt from "bcrypt";
import { generateUniqueUsername } from "~/utils/generateUniqueUsername";

interface User {
  name: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Request method not supported!" });
  }

  const { name, email, password } = req.body as User;

  if (!name.trim() || !validateEmail(email) || password.trim().length < 3) {
    return res.status(403).json({ message: "Wrong credentials" });
  }

  const alreadyExistedUser = await prisma.user.findUnique({ where: { email } });

  if (alreadyExistedUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 11);
  const uniqueUsername = generateUniqueUsername(email);

  try {
    await prisma.user.create({
      data: { name, email, username: uniqueUsername, password: hashedPassword },
    });

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
