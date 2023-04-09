import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      where: { authorId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  getTopic: protectedProcedure
    .input(z.object({ topicName: z.string() }))
    .query(({ ctx, input: { topicName } }) => {
      return ctx.prisma.topic.findFirstOrThrow({
        where: { authorId: ctx.session.user.id, title: topicName },
      });
    }),

  create: protectedProcedure
    .input(z.object({ title: z.string().nonempty() }))
    .mutation(({ ctx, input: { title } }) => {
      return ctx.prisma.topic.create({
        data: { title, authorId: ctx.session.user.id },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ topicId: z.string().nonempty() }))
    .mutation(({ ctx, input: { topicId } }) => {
      return ctx.prisma.topic.delete({ where: { id: topicId } });
    }),
});
