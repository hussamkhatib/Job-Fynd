import { Validation } from "@prisma/client";
import { z } from "zod";
import APIFilters from "../../utils/api-filter";
import { createRouter } from "../createRouter";

export const studentRouter = createRouter()
  .query("get", {
    input: z
      .object({
        pageIndex: z.number().optional(),
        pageSize: z.number().optional(),
      })
      .nullish(),
    async resolve({ ctx: { prisma } }) {
      const [count, results] = await prisma.$transaction([
        prisma.student.count(),
        prisma.student.findMany({
          select: {
            studentRecord: true,
          },
        }),
      ]);
      // TODO: add pagination
      return { count, results };
    },
  })
  //TODO: move this inside "get" ?
  .query("getPendingValidatons", {
    input: z
      .object({
        pageIndex: z.number().optional(),
        pageSize: z.number().optional(),
      })
      .nullish(),
    async resolve({ ctx, input }) {
      const { query } = new APIFilters(input).pagination();
      const options = {
        where: {
          validated: Validation.pending,
        },
      };
      const filter = { ...options, ...query };
      const [count, results] = await ctx.prisma.$transaction([
        ctx.prisma.record.count(options),
        ctx.prisma.record.findMany(filter),
      ]);
      return { count, results };
    },
  });
