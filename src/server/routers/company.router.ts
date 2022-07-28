import { z } from "zod";
import APIFilters from "../../utils/api-filter";
import { createRouter } from "../createRouter";

export const companyRouter = createRouter()
  .query("get", {
    input: z
      .object({
        pageIndex: z.number().optional(),
        pageSize: z.number().optional(),
      })
      .nullish(),
    async resolve({ ctx, input }) {
      const options = {
        include: {
          events: {
            select: {
              _count: {
                select: {
                  offers: true,
                },
              },
            },
          },
        },
      };
      const { query } = new APIFilters(input).pagination();
      const filter = { ...query, ...options };

      const [count, results] = await ctx.prisma.$transaction([
        ctx.prisma.company.count(),
        ctx.prisma.company.findMany(filter),
      ]);
      results.forEach((ele: any) => {
        ele["offers"] = ele.events.reduce((prev: number, cur: any) => {
          return prev + cur._count.offers;
        }, 0);
        delete ele.events;
      });
      return { count, results };
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string(),
      sector: z.string(),
    }),
    async resolve({ ctx: { prisma }, input }) {
      const { name, sector } = input;
      await prisma.company.create({
        data: {
          name,
          sector,
        },
      });
      return { success: "true" };
    },
  })
  .query("searchByName", {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ ctx, input: { name } }) {
      // if (name === "") return [];
      return await ctx.prisma.company.findMany({
        where: {
          name: {
            search: name,
          },
        },
      });
    },
  });
