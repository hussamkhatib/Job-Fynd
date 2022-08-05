import {
  Branch,
  EligibiltyOfferCount,
  Status,
  Validation,
} from "@prisma/client";
import { z } from "zod";
import { sendMail } from "../../utils/utils.server";
import { createProtectedRouter } from "../createRouter";

interface BranchWiseOffers {
  branch: Branch;
  unique_offer: number;
  multiple_offer: number;
}
export const adminRouter = createProtectedRouter()
  .query("branch.offers", {
    async resolve({ ctx }) {
      return await ctx.prisma.$queryRaw<BranchWiseOffers[]>`
SELECT branch,
sum(cnt >=1) AS unique_offer,
sum(cnt > 1) AS multiple_offer
FROM (
  SELECT r.branch, count(o.studentId) AS cnt
  FROM record r
  RIGHT JOIN offer o ON o.studentId = r.studentId
  GROUP BY r.branch, r.studentId 
  ) t
GROUP BY branch;`;
    },
  })
  .query("branch.placement", {
    async resolve({ ctx }) {
      //TODO: needs a SQL raq query
      return null;
      // const result = await ctx.prisma.student.findMany({
      //   select: {
      //     studentRecord: {
      //       select: {
      //         branch: true,
      //       },
      //     },
      //     _count: {
      //       select: {
      //         offer: true,
      //       },
      //     },
      //   },
      // });
      // const branchWisePlacedNonPlaced: any = {
      //   CSE: [0, 0],
      //   ISE: [0, 0],
      //   EC: [0, 0],
      //   EEE: [0, 0],
      // };
      // // 0 index - placed ,1 index - non-placed
      // result.forEach((res: any) => {
      //   const branch = res["branch"];
      //   const count = res["_count"].offers;
      //   count
      //     ? branchWisePlacedNonPlaced[branch][0]++
      //     : branchWisePlacedNonPlaced[branch][1]++;
      // });
      // return branchWisePlacedNonPlaced;
    },
  })
  // Event
  .query("event.getAll", {
    async resolve({ ctx }) {
      const results: any = await ctx.prisma.event.findMany({
        include: {
          company: true,
          _count: {
            select: {
              offers: true,
              students: true,
            },
          },
        },
      });
      results.forEach((ele: any) => {
        ele["sector"] = ele.company.sector;
        ele["company"] = ele.company.name;
        ele["offers"] = ele._count.offers;
        ele["applied"] = ele._count.students;
        delete ele._count;
      });
      return results;
    },
  })
  .mutation("event.create", {
    input: z.object({
      company_id: z.string(),
      title: z.string(),
      ctc: z.string(),
      type: z.string(),
      eligibilityOfferCount: z.nativeEnum(EligibiltyOfferCount),
      branches_allowed: z.nativeEnum(Branch).array(),
    }),
    async resolve({ ctx, input }) {
      const {
        company_id,
        title,
        ctc,
        type,
        branches_allowed,
        eligibilityOfferCount,
      } = input;
      const event = await ctx.prisma.event.create({
        data: {
          company_id,
          title,
          ctc,
          type,
          branches_allowed: {
            create: branches_allowed.map((branch: Branch) => ({
              name: branch,
            })),
          },
          eligibilityOfferCount,
        },
      });

      const getEligibleStudentEmails = await ctx.prisma.record.findMany({
        select: {
          email: true,
        },
        where: {
          branch: {
            in: branches_allowed,
          },
          validated: Validation.validated,
        },
      });
      const emails = getEligibleStudentEmails.map((res: any) => res.email);
      sendMail(emails, "Event Created", `${title} has been created`);

      return event;
    },
  })
  .mutation("event.update", {
    input: z.object({
      id: z.string(),
      status: z.nativeEnum(Status).optional(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const result: any = await ctx.prisma.event.update({
        where: {
          id,
        },
        include: {
          company: true,
          _count: {
            select: {
              offers: true,
              students: true,
            },
          },
        },
        data: input,
      });
      result["sector"] = result.company.sector;
      result["company"] = result.company.name;
      result["offers"] = result._count.offers;
      result["applied"] = result._count.students;
      delete result._count;
      return result;
    },
  })
  .mutation("event.delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const result = await ctx.prisma.event.delete({
        where: {
          id,
        },
      });
      return result;
    },
  })
  //Student
  .query("student.getByUsn", {
    input: z.object({
      usn: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { usn } = input;
      return await ctx.prisma.record.findUnique({
        where: {
          usn,
        },
      });
    },
  })
  .mutation("student.updateValidation", {
    input: z.object({
      usn: z.string(),
      validated: z.nativeEnum(Validation),
    }),
    async resolve({ ctx, input }) {
      const { usn, validated } = input;
      const getStudentEmail = await ctx.prisma.record.findUnique({
        where: {
          usn,
        },
        select: {
          email: true,
        },
      });

      if (getStudentEmail)
        sendMail(
          getStudentEmail.email,
          "Validation Status",
          `Your record is ${validated}`
        );

      return await ctx.prisma.record.update({
        where: {
          usn,
        },
        data: {
          validated,
        },
      });
    },
  })
  // company
  .query("companies.getAll", {
    async resolve({ ctx }) {
      const results: any = await ctx.prisma.company.findMany({
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
      });
      results.forEach((ele: any) => {
        ele["offers"] = ele.events.reduce((prev: number, cur: any) => {
          return prev + cur._count.offers;
        }, 0);
        delete ele.events;
      });
      return results;
    },
  });
