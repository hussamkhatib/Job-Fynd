import { EventResult, Status, Validation } from "@prisma/client";
import { z } from "zod";
import APIFilters from "../../utils/api-filter";
import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";
import { uploadFile } from "../../utils/utils.server";
import { acceptOffer, rejectOffer } from "../../schema/event.schema";

export const eventRouter = createRouter()
  .query("get", {
    input: z
      .object({
        pageIndex: z.number().optional(),
        pageSize: z.number().optional(),
        id: z.string().optional(),
        desc: z.boolean().optional(),
      })
      .nullish(),
    async resolve({ ctx: { prisma }, input }) {
      const options = {
        include: {
          branches_allowed: true,
          company: true,
          _count: {
            select: {
              offers: true,
              students: true,
            },
          },
        },
      };
      const { query } = new APIFilters(input).sort().pagination();

      const filter = { ...query, ...options };
      const [count, results] = await prisma.$transaction([
        prisma.event.count(),
        prisma.event.findMany(filter),
      ]);
      return { count, results };
    },
  })
  .query("getById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
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
      return { result, data };
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

      const hasStudentAlreadyApplied =
        await ctx.prisma.student_enrollment.count({
          where: {
            event_id,
            studentId: ctx.user?.id,
          },
        });
      if (hasStudentAlreadyApplied)
        new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "You have already applied for this event",
        });

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
      if (!getEvent)
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "This event is not open",
        });

      const branchesAllowed = getEvent?.branches_allowed.map(
        (branch) => branch.name
      );
      const branch = ctx.user?.studentRecord?.branch;
      if (!branch)
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: `This event is only open for ${branchesAllowed.join(
            ", "
          )} branch`,
        });
      if (branchesAllowed && !branchesAllowed.includes(branch))
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: `This event is only open for ${branchesAllowed.join(
            ", "
          )} branch`,
        });

      if (ctx.user?.studentRecord?.validated !== Validation.validated)
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: `Your profile is not validated yet`,
        });
      if (ctx.user?.id)
        return await ctx.prisma.student_enrollment.create({
          data: {
            event_id,
            studentId: ctx.user?.id,
          },
        });
    },
  })
  .mutation("id.acceptOffer", {
    input: acceptOffer,
    async resolve({ ctx, input }) {
      const { ctc, file, buffer, id } = input;

      const isStudentAppliedForEvent =
        await ctx.prisma.student_enrollment.findUnique({
          where: {
            event_id_studentId: {
              event_id: id,
              studentId: ctx.user?.id,
            },
          },
        });
      // TODO: middleware for this
      if (!isStudentAppliedForEvent)
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "You have not applied for this Event",
        });

      // TODO: might need to remove if create is replaced with upsert
      const isOfferExist = await ctx.prisma.offer.count({
        where: {
          event_id: id,
          studentId: ctx.user.id,
        },
      });

      if (isOfferExist)
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "You have already uploaded a offer for this Event",
        });

      const { secure_url } = await uploadFile(buffer);

      await ctx.prisma.$transaction([
        ctx.prisma.student_enrollment.update({
          where: {
            event_id_studentId: {
              event_id: id,
              studentId: ctx.user.id,
            },
          },
          data: {
            result: EventResult.placed,
          },
        }),
        ctx.prisma.offer.create({
          data: {
            ctc,
            offer_letter: {
              url: secure_url,
              file,
            },
            event_id: id,
            studentId: ctx.user.id,
          },
        }),
      ]);
      return { success: true };
      //TODO: better response
    },
  })
  .mutation("id.rejectOffer", {
    input: rejectOffer,
    async resolve({ ctx, input }) {
      const { id } = input;
      await ctx.prisma.student_enrollment.update({
        where: {
          event_id_studentId: {
            event_id: id,
            studentId: ctx.user.id,
          },
        },
        data: {
          result: EventResult.rejected,
        },
      });
      return { success: true };
    },
  });
// TODO : add a middler for checking whenever required
