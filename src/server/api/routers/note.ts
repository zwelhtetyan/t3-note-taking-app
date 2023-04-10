import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  getNotesByRelevantTitle: protectedProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(({ ctx, input: { searchTerm } }) => {
      if (searchTerm.trim().length) {
        return ctx.prisma.note.findMany({
          where: {
            authorId: ctx.session.user.id,
            title: { search: searchTerm, mode: "insensitive" },
          },
          include: { topic: true },
        });
      }
    }),

  getNotesByTopic: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input: { topicId } }) => {
      return ctx.prisma.note.findMany({
        where: { topicId },
        include: { topic: true },
      });
    }),

  getNote: protectedProcedure
    .input(z.object({ noteId: z.string(), topicName: z.string() }))
    .query(async ({ ctx, input: { noteId, topicName } }) => {
      const note: any = await ctx.prisma.note.findUnique({
        where: { id: noteId },
        include: { topic: true },
      });

      if (
        note?.authorId === ctx.session.user.id &&
        topicName === note?.topic.title
      ) {
        return note;
      } else {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No note found!. You can only get you own note",
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

  update: protectedProcedure
    .input(
      z.object({
        title: z.string().nonempty({ message: "title is required" }),
        content: z.string().nonempty({ message: "content is required" }),
        noteId: z.string().nonempty({ message: "Invalid noteId" }),
      })
    )
    .mutation(({ ctx, input: { title, content, noteId } }) => {
      return ctx.prisma.note.update({
        where: { id: noteId },
        data: { title, content },
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
