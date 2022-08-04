import { EventResult, Role, Status, Validation } from "@prisma/client";
import { z } from "zod";
import APIFilters from "../../utils/api-filter";
import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";
import { uploadFile } from "../../utils/utils.server";

export const eventRouter = createRouter()
  .query("get", {
    input: z
      .object({
        pageIndex: z.number().optional(),
        pageSize: z.number().optional(),
      })
      .nullish(),
    async resolve({ ctx: { prisma }, input }) {
      const options = {
        include: {
          company: true,
          _count: {
            select: {
              offers: true,
              students: true,
            },
          },
        },
      };
      const { query } = new APIFilters(input).pagination();
      const filter = { ...query, ...options };
      const [count, results] = await prisma.$transaction([
        prisma.event.count(),
        prisma.event.findMany(filter),
      ]);
      results.forEach((ele: any) => {
        ele["sector"] = ele.company.sector;
        ele["company"] = ele.company.name;
        ele["offers"] = ele._count.offers;
        ele["applied"] = ele._count.students;
        delete ele._count;
      });
      return { count, results };
    },
  })
  .query("getById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      if (ctx.user.role === Role.student) {
        const [result, data]: any = await ctx.prisma.$transaction([
          ctx.prisma.student_enrollment.findUnique({
            where: {
              event_id_studentId: {
                event_id: id,
                studentId: ctx.user.id,
              },
            },
            select: {
              result: true,
            },
          }),
          ctx.prisma.event.findUnique({
            where: {
              id,
            },
            include: {
              company: {
                select: {
                  name: true,
                  sector: true,
                },
              },
              branches_allowed: {
                select: {
                  name: true,
                },
              },
            },
          }),
        ]);
        data["sector"] = data.company.sector;
        data["company"] = data.company.name;
        return { result: result?.result, data };
      }
      if (ctx.user.role === Role.admin) {
        const result: any = await ctx.prisma.event.findUnique({
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
        });
        result["sector"] = result.company.sector;
        result["company"] = result.company.name;
        result["offers"] = result._count.offers;
        result["applied"] = result._count.students;
        delete result._count;
        return result;
      }
    },
  })
  .query("id.offers", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input: { id } }) {
      const result: any = await ctx.prisma.offer.findMany({
        where: {
          event_id: id,
        },
        include: {
          student: {
            select: {
              studentRecord: {
                select: {
                  name: true,
                  branch: true,
                  usn: true,
                },
              },
            },
          },
        },
      });
      const offers: any = result.map((item: any) => {
        return {
          ctc: item.ctc,
          name: item?.student?.studentRecord?.name,
          branch: item.student.studentRecord.branch,
          usn: item.student.studentRecord.usn,
        };
      });
      return offers;
    },
  })
  .mutation("id.apply", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const event_id = input.id;

      // check if already applied , this ensures createdAt is not updated and avoids unecessary writes.
      let isValid = true;
      const hasStudentAlreadyApplied =
        await ctx.prisma.student_enrollment.count({
          where: {
            event_id,
            studentId: ctx.user?.id,
          },
        });
      if (hasStudentAlreadyApplied) isValid = false;
      // check if the event is open
      const getEvent = await ctx.prisma.event.findFirst({
        where: {
          id: event_id,
          status: Status.Open,
        },
        select: {
          branches_allowed: {
            select: {
              name: true,
            },
          },
        },
      });
      if (!getEvent) isValid = false;

      const branchesAllowed = getEvent?.branches_allowed.map(
        (branch) => branch.name
      );
      // check if student branch is allowed
      const branch = ctx.user?.details?.studentRecord?.branch;
      if (branchesAllowed && branch && branchesAllowed.includes(branch))
        isValid = false;
      isValid = false;

      // check if student profile is validated
      if (ctx.user?.details?.studentRecord?.validated !== Validation.validated)
        isValid = false;

      if (isValid && ctx.user?.id)
        await ctx.prisma.student_enrollment.create({
          data: {
            event_id,
            studentId: ctx.user?.id,
          },
        });
    },
  })
  .mutation("id.application", {
    input: z.object({
      id: z.string(),
      result: z.string(),
      ctc: z.string().optional(),
      // TODO e66f7545-3a83-423c-817e-0dd6edefcba4
      offer_letter: z.any().optional(),
    }),
    async resolve({ ctx, input }) {
      const event_id = input.id;

      const isStudentAppliedForEvent =
        await ctx.prisma.student_enrollment.findUnique({
          where: {
            event_id_studentId: {
              event_id,
              studentId: ctx.user?.id,
            },
          },
        });

      if (!isStudentAppliedForEvent)
        new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "You have not applied for this Event",
        });

      if (input.result === EventResult.rejected) {
        await ctx.prisma.student_enrollment.update({
          where: {
            event_id_studentId: {
              event_id,
              studentId: ctx.user.id,
            },
          },
          data: {
            result: EventResult.rejected,
          },
        });
        return;
      }

      if (input.result === EventResult.placed) {
        const { ctc, offer_letter } = input;

        const isOfferExist = await ctx.prisma.offer.count({
          where: {
            event_id,
            studentId: ctx.user.id,
          },
        });

        if (isOfferExist)
          new trpc.TRPCError({
            code: "FORBIDDEN",
            message: "You have already uploaded a offer for this Event",
          });

        const { secure_url } = await uploadFile(offer_letter);
        if (ctc) {
          await Promise.all([
            await ctx.prisma.student_enrollment.update({
              where: {
                event_id_studentId: {
                  event_id,
                  studentId: ctx.user.id,
                },
              },
              data: {
                result: EventResult.placed,
              },
            }),
            await ctx.prisma.offer.create({
              data: {
                ctc,
                offer_letter: secure_url,
                event_id,
                studentId: ctx.user.id,
              },
            }),
          ]);
          return { success: true };
        } else {
          return { sucess: false };
          //TODO: better response
        }
      }
    },
  })
  .query("id.applications", {
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
                  email: true,
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
  });
