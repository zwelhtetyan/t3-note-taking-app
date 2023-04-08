import { TRPCError } from "@trpc/server";
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

  getNote: protectedProcedure
    .input(z.object({ noteId: z.string() }))
    .query(async ({ ctx, input: { noteId } }) => {
      const note = await ctx.prisma.note.findUnique({ where: { id: noteId } });

      if (note?.authorId === ctx.session.user.id) {
        return note;
      } else {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only get you own note",
        });
      }
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().nonempty({ message: "title is required" }),
        content: z.string().nonempty({ message: "content is required" }),
        topicId: z
          .string()
          .nonempty({ message: "please create a topic first" }),
        authorId: z.string().nonempty(),
      })
    )
    .mutation(({ ctx, input: { title, content, topicId, authorId } }) => {
      return ctx.prisma.note.create({
        data: { title, content, topicId, authorId },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({ noteId: z.string().nonempty({ message: "invalid noteId" }) })
    )
    .mutation(({ ctx, input: { noteId } }) => {
      return ctx.prisma.note.delete({ where: { id: noteId } });
    }),
});
