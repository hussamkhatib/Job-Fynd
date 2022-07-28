import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "../server/routers/app.router";

export const trpc = createReactQueryHooks<AppRouter>();
