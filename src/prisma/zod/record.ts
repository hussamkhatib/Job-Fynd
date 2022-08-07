import * as z from "zod";
import {
  Branch,
  Gender,
  Validation,
  Opted,
  Board,
  ScoreType,
} from "@prisma/client";
import { Completeuser, userModel } from "./index";

export const _recordModel = z.object({
  id: z.string(),
  name: z.string(),
  usn: z.string().nullish(),
  branch: z.nativeEnum(Branch).nullish(),
  gender: z.nativeEnum(Gender).nullish(),
  email: z.string(),
  image: z.string().nullish(),
  validated: z.nativeEnum(Validation).nullish(),
  opted: z.nativeEnum(Opted).nullish(),
  resume: z.string().nullish(),
  phoneNumber: z.string().nullish(),
  parentsPhoneNumber: z.string().nullish(),
  PermanentAddress: z.string().nullish(),
  currentAddress: z.string().nullish(),
  pinCode: z.string().nullish(),
  bloodGroup: z.string().nullish(),
  panCardNumber: z.string().nullish(),
  voterId: z.string().nullish(),
  adharCard: z.string().nullish(),
  passportNumber: z.string().nullish(),
  sslcboard: z.nativeEnum(Board).nullish(),
  sslcscoreType: z.nativeEnum(ScoreType).nullish(),
  sslcscore: z.string().nullish(),
  sslcmarksSheet: z.string().nullish(),
  pucboard: z.nativeEnum(Board).nullish(),
  pucscoreType: z.nativeEnum(ScoreType).nullish(),
  pucscore: z.string().nullish(),
  pucmarksSheet: z.string().nullish(),
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
  studentId: z.string(),
});

export interface Completerecord extends z.infer<typeof _recordModel> {
  student?: Completeuser | null;
}

/**
 * recordModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const recordModel: z.ZodSchema<Completerecord> = z.lazy(() =>
  _recordModel.extend({
    student: userModel.nullish(),
  })
);
