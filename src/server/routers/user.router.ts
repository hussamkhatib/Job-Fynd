import { Validation } from "@prisma/client";
import { z } from "zod";
import {
  updateDiplomaOrGraduation,
  updateProfile,
  updatePuc,
  updateSslc,
} from "../../schema/me.schema";
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
        data: {
          ...input,
          // TODO: make sure validated becomes "non-validated when record is updated"
          // enable this if user is informed about it when they update their record
          // validated: Validation.notvalidated, // skip this if it is pending
        },
      });
    },
  })
  .mutation("me.requestForValidation", {
    async resolve({ ctx }) {
      return await ctx.prisma.record.update({
        where: {
          studentId: ctx.user.id,
        },
        data: {
          validated: Validation.pending,
        },
      });
    },
  })

  .mutation("me.update.profile", {
    input: updateProfile,
    async resolve({ ctx, input }) {
      const studentId = ctx.user.id;
      return await ctx.prisma.record.upsert({
        where: {
          studentId,
        },
        update: input,
        create: { ...input, studentId },
      });
    },
  })
  .mutation("me.update.sslc", {
    input: updateSslc,
    async resolve({ ctx, input }) {
      const copyInput = { ...input };
      delete copyInput.buffer;
      delete copyInput.file;

      if (input.buffer) {
        const { secure_url } = await uploadFile(input.buffer);
        return await ctx.prisma.record.update({
          where: {
            studentId: ctx.user.id,
          },
          data: {
            ...copyInput,
            sslcmarksSheet: {
              file: input.file,
              url: secure_url,
            },
          },
        });
      } else
        return await ctx.prisma.record.update({
          where: {
            studentId: ctx.user.id,
          },
          data: copyInput,
        });
    },
  })
  .mutation("me.update.puc", {
    input: updatePuc,
    async resolve({ ctx, input }) {
      const copyInput = { ...input };
      delete copyInput.buffer;
      delete copyInput.file;

      if (input.buffer) {
        const { secure_url } = await uploadFile(input.buffer);
        return await ctx.prisma.record.update({
          where: {
            studentId: ctx.user.id,
          },
          data: {
            ...copyInput,
            pucmarksSheet: {
              file: input.file,
              url: secure_url,
            },
          },
        });
      } else
        return await ctx.prisma.record.update({
          where: {
            studentId: ctx.user.id,
          },
          data: copyInput,
        });
    },
  })
  .mutation("me.update.diplomaOrGraduation", {
    input: updateDiplomaOrGraduation,
    async resolve({ ctx, input }) {
      const key = Object.keys(input)[0];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const prevData = ctx.user.studentRecord[key];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (input[key].buffer) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { secure_url } = await uploadFile(input[key].buffer);
        return await ctx.prisma.record.update({
          where: {
            studentId: ctx.user.id,
          },
          data: {
            [key]: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              score: input[key].score,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              file: input[key].file,
              url: secure_url,
            },
          },
        });
      } else
        return await ctx.prisma.record.update({
          where: {
            studentId: ctx.user.id,
          },
          data: {
            [key]: {
              ...prevData,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              score: input[key].score,
            },
          },
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
