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

// Helper schema for JSON fields
type Literal = boolean | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export const _recordModel = z.object({
  id: z.string(),
  name: z.string(),
  usn: z.string().nullish(),
  branch: z.nativeEnum(Branch).nullish(),
  gender: z.nativeEnum(Gender).nullish(),
  personalEmail: z.string().nullish(),
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
  sslcmarksSheet: jsonSchema,
  pucboard: z.nativeEnum(Board).nullish(),
  pucscoreType: z.nativeEnum(ScoreType).nullish(),
  pucscore: z.string().nullish(),
  pucmarksSheet: jsonSchema,
  graduationSem1: jsonSchema,
  graduationSem2: jsonSchema,
  graduationSem3: jsonSchema,
  graduationSem4: jsonSchema,
  graduationSem5: jsonSchema,
  graduationSem6: jsonSchema,
  graduationSem7: jsonSchema,
  graduationSem8: jsonSchema,
  diplomaSem1: jsonSchema,
  diplomaSem2: jsonSchema,
  diplomaSem3: jsonSchema,
  diplomaSem4: jsonSchema,
  diplomaSem5: jsonSchema,
  diplomaSem6: jsonSchema,
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
