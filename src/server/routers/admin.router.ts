import {
  Branch,
  EligibiltyOfferCount,
  Status,
  Validation,
} from "@prisma/client";
import { z } from "zod";
import APIFilters from "../../utils/api-filter";
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
          personalEmail: true,
        },
        where: {
          branch: {
            in: branches_allowed,
          },
          validated: Validation.validated,
        },
      });
      const emails = getEligibleStudentEmails.map(
        (res: any) => res.personalEmail
      );
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
  .query("event.id.applications", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const result = await ctx.prisma.student_enrollment.findMany({
        where: {
          event_id: input.id,
        },
        select: {
          student: {
            select: {
              studentRecord: {
                select: {
                  name: true,
                  usn: true,
                  personalEmail: true,
                  branch: true,
                  validated: true,
                },
              },
            },
          },
        },
      });
      const students = result.map((item) => item?.student?.studentRecord);
      return students;
    },
  })
  // Student
  .query("student.get", {
    input: z
      .object({
        pageIndex: z.number().optional(),
        pageSize: z.number().optional(),
      })
      .nullish(),
    async resolve({ ctx: { prisma } }) {
      const [count, results] = await prisma.$transaction([
        prisma.record.count(),
        prisma.record.findMany({}),
      ]);
      // TODO: add pagination
      return { count, results };
    },
  })
  //TODO: move this inside "get" ?
  .query("student.getPendingValidatons", {
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
  })
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
  .query("student.offers", {
    input: z
      .object({
        pageIndex: z.number().optional(),
        pageSize: z.number().optional(),
      })
      .nullish(),
    async resolve({ ctx, input }) {
      const { query } = new APIFilters(input).pagination();
      const options = {
        select: {
          ctc: true,
          offer_letter: true,
          event: {
            select: {
              type: true,
              company: {
                select: {
                  name: true,
                  sector: true,
                },
              },
            },
          },
          student: {
            select: {
              studentRecord: {
                select: {
                  name: true,
                  personalEmail: true,
                  phoneNumber: true,
                  branch: true,
                  usn: true,
                },
              },
            },
          },
        },
      };
      const filter = { ...options, ...query };

      const [count, results] = await ctx.prisma.$transaction([
        ctx.prisma.offer.count(),
        ctx.prisma.offer.findMany(filter),
      ]);
      results.forEach((res: any) => {
        res["type"] = res.event.type;
        res["company"] = res.event.company.name;
        res["sector"] = res.event.company.sector;
        res["branch"] = res.student.studentRecord.branch;
        res["usn"] = res.student.studentRecord.usn;
        res["name"] = res.student.studentRecord.name;
        res["personalEmail"] = res.student.studentRecord.personalEmail;
        res["phoneNumber"] = res.student.studentRecord.phoneNumber;
        delete res.event;
        delete res.student;
      });
      return { results, count };
    },
  })
  .query("student.offers.getAll", {
    async resolve({ ctx }) {
      const results: any = await ctx.prisma.offer.findMany({
        select: {
          ctc: true,
          offer_letter: true,
          event: {
            select: {
              type: true,
              company: {
                select: {
                  name: true,
                  sector: true,
                },
              },
            },
          },
          student: {
            select: {
              studentRecord: {
                select: {
                  name: true,
                  personalEmail: true,
                  phoneNumber: true,
                  branch: true,
                  usn: true,
                },
              },
            },
          },
        },
      });
      results.forEach((res: any) => {
        res["type"] = res.event.type;
        res["company"] = res.event.company.name;
        res["sector"] = res.event.company.sector;
        res["branch"] = res.student.studentRecord.branch;
        res["usn"] = res.student.studentRecord.usn;
        res["name"] = res.student.studentRecord.name;
        res["personalEmail"] = res.student.studentRecord.personalEmail;
        res["phoneNumber"] = res.student.studentRecord.phoneNumber;
        delete res.event;
        delete res.student;
      });
      return results;
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
          personalEmail: true,
        },
      });

      if (getStudentEmail?.personalEmail)
        sendMail(
          getStudentEmail.personalEmail,
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
  .query("company.get", {
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
  .mutation("company.create", {
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
  .query("company.searchByName", {
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
  })
  .query("company.getAll", {
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
