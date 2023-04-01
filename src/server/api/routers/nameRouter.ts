import { createTRPCRouter, publicProcedure } from "../trpc";

export const nameRouter = createTRPCRouter({
  getName: publicProcedure.query(() => "Zwel"),
});
