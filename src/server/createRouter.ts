import { Role } from "@prisma/client";
import { router, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
// import { ZodError } from "zod";
import { Context } from "./context";

export function createRouter() {
  return router<Context>()
    .formatError(({ shape, error }) => {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.code === "BAD_REQUEST" && error.cause instanceof ZodError
              ? error.cause.flatten()
              : null,
        },
      };
    })
    .middleware(async ({ ctx, next }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      return next({
        ctx: {
          ...ctx,
          // infers that `user` are non-nullable to downstream procedures
          user: ctx.user,
        },
      });
    });
}

export function createProtectedRouter() {
  return router<Context>()
    .formatError(({ shape, error }) => {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.code === "BAD_REQUEST" && error.cause instanceof ZodError
              ? error.cause.flatten()
              : null,
        },
      };
    })
    .middleware(({ ctx, next }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });

      if (ctx.user.role === Role.admin)
        return next({
          ctx: {
            ...ctx,
            // infers that `user` are non-nullable to downstream procedures
            user: ctx.user,
          },
        });
      else
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to do this",
        });
    });
}
