import { Board, ScoreType } from "@prisma/client";
import { z } from "zod";

const diplomaOrGraduationData = z
  .object({
    score: z.string(),
    file: z.string().nullish(),
    buffer: z.string().nullish(),
  })
  .nullish();

export const updateDiplomaOrGraduation = z.object({
  diplomaSem1: diplomaOrGraduationData,
  diplomaSem2: diplomaOrGraduationData,
  diplomaSem3: diplomaOrGraduationData,
  diplomaSem4: diplomaOrGraduationData,
  diplomaSem5: diplomaOrGraduationData,
  diplomaSem6: diplomaOrGraduationData,
  graduationSem1: diplomaOrGraduationData,
  graduationSem2: diplomaOrGraduationData,
  graduationSem3: diplomaOrGraduationData,
  graduationSem4: diplomaOrGraduationData,
  graduationSem5: diplomaOrGraduationData,
  graduationSem6: diplomaOrGraduationData,
  graduationSem7: diplomaOrGraduationData,
  graduationSem8: diplomaOrGraduationData,
});

export const updateSslc = z.object({
  sslcboard: z.nativeEnum(Board).nullish(),
  sslcscoreType: z.nativeEnum(ScoreType).nullish(),
  sslcscore: z.string().nullish(),
  buffer: z.any().nullish(),
  file: z.string().nullish(),
});

export const updatePuc = z.object({
  pucboard: z.nativeEnum(Board).nullish(),
  pucscoreType: z.nativeEnum(ScoreType).nullish(),
  pucscore: z.string().nullish(),
  buffer: z.any().nullish(),
  file: z.string().nullish(),
});
