import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany();
  }),

  getNotesByTopic: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input: { topicId } }) => {
      return ctx.prisma.note.findMany({
        where: { topicId },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        topicId: z.string().min(1),
        authorId: z.string().min(1),
      })
    )
    .mutation(({ ctx, input: { title, content, topicId, authorId } }) => {
      return ctx.prisma.note.create({
        data: { title, content, topicId, authorId },
      });
    }),
});
