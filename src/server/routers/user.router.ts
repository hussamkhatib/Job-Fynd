import { Board, Branch, Gender, ScoreType } from "@prisma/client";
import { z } from "zod";
import { uploadFile } from "../../utils/utils.server";

import { createRouter } from "../createRouter";

export const userRouter = createRouter()
  .query("me", {
    async resolve({ ctx: { user } }) {
      return user;
    },
  })
  .mutation("me.update.record", {
    //TODO: add better validation
    input: z.object({
      phoneNumber: z.string().nullish(),
      parentsPhoneNumber: z.string().nullish(),
      PermanentAddress: z.string().nullish(),
      currentAddress: z.string().nullish(),
      pinCode: z.string().nullish(),
      bloodGroup: z.string().nullish(),
      panCardNumber: z.string().nullish(),
      voterId: z.string().nullish(),
    }),

    async resolve({ ctx, input }) {
      return await ctx.prisma.record.update({
        where: {
          studentId: ctx.user.id,
        },
        data: input,
      });
    },
  })
  .mutation("me.update.profile", {
    //TODO: add better validation
    input: z.object({
      name: z.string(),
      usn: z.string().nullish(),
      branch: z.nativeEnum(Branch).nullish(),
      gender: z.nativeEnum(Gender).nullish(),
      email: z.string(),
    }),

    async resolve({ ctx, input }) {
      return await ctx.prisma.record.update({
        where: {
          studentId: ctx.user.id,
        },
        data: input,
      });
    },
  })
  .mutation("me.update.sslc", {
    input: z.object({
      sslcboard: z.nativeEnum(Board).nullish(),
      sslcscoreType: z.nativeEnum(ScoreType).nullish(),
      sslcscore: z.string().nullish(),
      // TODO:Array Buffer is not assignable to string | main | e66f7545-3a83-423c-817e-0dd6edefcba4
      sslcmarksSheet: z.any().nullish(),
    }),

    async resolve({ ctx, input }) {
      const copyInput = { ...input };
      const marksSheet =
        input?.sslcmarksSheet &&
        //  dont upload a uploaded file
        // TODO: find a better way todo it
        !input?.sslcmarksSheet.startsWith("https://res.cloudinary.com") &&
        (await uploadFile(input.sslcmarksSheet));
      if (marksSheet) copyInput.sslcmarksSheet = marksSheet.secure_url;

      return await ctx.prisma.record.update({
        where: {
          studentId: ctx.user.id,
        },
        data: copyInput,
      });
    },
  })
  .mutation("me.update.puc", {
    input: z.object({
      pucboard: z.nativeEnum(Board).nullish(),
      pucscoreType: z.nativeEnum(ScoreType).nullish(),
      pucscore: z.string().nullish(),
      // TODO:Array Buffer is not assignable to string  | e66f7545-3a83-423c-817e-0dd6edefcba4
      pucmarksSheet: z.any().nullish(),
    }),

    async resolve({ ctx, input }) {
      const copyInput = { ...input };
      const marksSheet =
        //  dont upload a uploaded file
        // TODO: find a better way todo it
        !input?.pucmarksSheet.startsWith("https://res.cloudinary.com") &&
        input?.pucmarksSheet &&
        (await uploadFile(input.pucmarksSheet));
      if (marksSheet) copyInput.pucmarksSheet = marksSheet.secure_url;

      return await ctx.prisma.record.update({
        where: {
          studentId: ctx.user.id,
        },
        data: copyInput,
      });
    },
  })
  .mutation("me.update.diplomaOrGraduation", {
    input: z
      .object({
        diplomaSems1score: z.string().nullish(),
        diplomaSems1MarksSheet: z.string().nullish(),
        diplomaSems2score: z.string().nullish(),
        diplomaSems2MarksSheet: z.string().nullish(),
        diplomaSems3score: z.string().nullish(),
        diplomaSems3MarksSheet: z.string().nullish(),
        diplomaSems4score: z.string().nullish(),
        diplomaSems4MarksSheet: z.string().nullish(),
        diplomaSems5score: z.string().nullish(),
        diplomaSems5MarksSheet: z.string().nullish(),
        diplomaSems6score: z.string().nullish(),
        diplomaSems6MarksSheet: z.string().nullish(),
        graduationSem1score: z.string().nullish(),
        graduationSem1MarksSheet: z.string().nullish(),
        graduationSem2score: z.string().nullish(),
        graduationSem2MarksSheet: z.string().nullish(),
        graduationSem3score: z.string().nullish(),
        graduationSem3MarksSheet: z.string().nullish(),
        graduationSem4score: z.string().nullish(),
        graduationSem4MarksSheet: z.string().nullish(),
        graduationSem5score: z.string().nullish(),
        graduationSem5MarksSheet: z.string().nullish(),
        graduationSem6score: z.string().nullish(),
        graduationSem6MarksSheet: z.string().nullish(),
        graduationSem7score: z.string().nullish(),
        graduationSem7MarksSheet: z.string().nullish(),
        graduationSem8score: z.string().nullish(),
        graduationSem8MarksSheet: z.string().nullish(),
      })
      .nullish(),
    async resolve({ ctx, input }) {
      const copyInput = { ...input };
      const regex = new RegExp("MarksSheet");

      for (const prop in copyInput) {
        // TODO: find a better to check if body has files in it
        if (
          regex.test(prop) &&
          !prop.startsWith("https://res.cloudinary.com")
        ) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignores
          const { secure_url } = await uploadFile(copyInput[prop]);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignores
          copyInput[prop] = secure_url;
        }
      }
      return await ctx.prisma.record.update({
        where: {
          studentId: ctx.user.id,
        },
        data: copyInput,
      });
    },
  })

  .query("me.applications", {
    async resolve({ ctx }) {
      const result = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.user.id,
        },
        select: {
          applied_jobs: {
            select: {
              result: true,
              event: {
                include: {
                  company: {
                    select: {
                      name: true,
                      sector: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return result?.applied_jobs;
    },
  })
  .query("me.offers", {
    async resolve({ ctx }) {
      const result = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.user.id,
        },
        select: {
          offer: {
            select: {
              ctc: true,
              offer_letter: true,
              event: {
                select: {
                  title: true,
                  type: true,
                  company: {
                    select: {
                      name: true,
                      sector: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      const offers = result?.offer?.map((item: any) => {
        return {
          ctc: item.ctc,
          company: item.event.company.name,
          sector: item.event.company.sector,
          offer_letter: item.offer_letter,
          title: item.event.title,
          type: item.event.type,
        };
      });
      return offers || [];
    },
  });
