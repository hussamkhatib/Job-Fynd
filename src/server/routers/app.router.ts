import { createRouter } from "../createRouter";
import { adminRouter } from "./admin.router";
import { eventRouter } from "./event.router";
import { userRouter } from "./user.router";

export const appRouter = createRouter()
  .merge("users.", userRouter)
  .merge("events.", eventRouter)
  .merge("admin.", adminRouter);

export type AppRouter = typeof appRouter;
