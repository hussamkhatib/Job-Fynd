import z from "zod";

export const acceptOffer = z.object({
  id: z.string(),
  result: z.string(),
  ctc: z.string(),
  buffer: z.any(),
  file: z.string(),
});

export const rejectOffer = z.object({
  id: z.string(),
  result: z.string(),
});
