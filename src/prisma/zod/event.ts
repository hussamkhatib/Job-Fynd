import * as z from "zod"
import { Status, EligibiltyOfferCount } from "@prisma/client"
import { Completeoffer, offerModel, Completecompany, companyModel, Completestudent_enrollment, student_enrollmentModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _eventModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  title: z.string(),
  ctc: z.string(),
  type: z.string(),
  status: z.nativeEnum(Status),
  branches_allowed: jsonSchema,
  eligibilityOfferCount: z.nativeEnum(EligibiltyOfferCount),
  company_id: z.string(),
})

export interface Completeevent extends z.infer<typeof _eventModel> {
  offers: Completeoffer[]
  company: Completecompany
  students: Completestudent_enrollment[]
}

/**
 * eventModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const eventModel: z.ZodSchema<Completeevent> = z.lazy(() => _eventModel.extend({
  offers: offerModel.array(),
  company: companyModel,
  students: student_enrollmentModel.array(),
}))
