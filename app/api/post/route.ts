import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allPosts = await prisma.post.findMany();
    return NextResponse.json(allPosts);
  } catch (error) {
    return NextResponse.json(error);
  }
}
