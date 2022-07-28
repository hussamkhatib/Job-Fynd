import { createRouter } from "../createRouter";
import { adminRouter } from "./admin.router";
import { companyRouter } from "./company.router";
import { eventRouter } from "./event.router";
import { studentRouter } from "./student.router";
import { userRouter } from "./user.router";

export const appRouter = createRouter()
  .merge("users.", userRouter)
  .merge("events.", eventRouter)
  .merge("students.", studentRouter)
  .merge("companies.", companyRouter)
  .merge("admin.", adminRouter);

export type AppRouter = typeof appRouter;
