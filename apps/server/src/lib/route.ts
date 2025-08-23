import { publicProcedure } from "@/lib/orpc";
import { chatRoutes } from "@/routes/chat";

const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "Healthy!";
  }),

  chat: chatRoutes,
};

export { appRouter };
export type AppRouter = typeof appRouter;
