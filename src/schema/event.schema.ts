import z from "zod";

export const acceptOffer = z.object({
  id: z.string(),
  result: z.string(),
  ctc: z.number(),
  buffer: z.any(),
  file: z.string(),
});

export const rejectOffer = z.object({
  id: z.string(),
  result: z.string(),
});
