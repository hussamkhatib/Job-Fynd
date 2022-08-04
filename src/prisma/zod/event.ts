import * as z from "zod"
import { Status, EligibiltyOfferCount } from "@prisma/client"
import { Completebranch, branchModel, Completeoffer, offerModel, Completecompany, companyModel, Completestudent_enrollment, student_enrollmentModel } from "./index"

export const _eventModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  title: z.string(),
  ctc: z.string(),
  type: z.string(),
  status: z.nativeEnum(Status),
  eligibilityOfferCount: z.nativeEnum(EligibiltyOfferCount),
  company_id: z.string(),
})

export interface Completeevent extends z.infer<typeof _eventModel> {
  branches_allowed: Completebranch[]
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
  branches_allowed: branchModel.array(),
  offers: offerModel.array(),
  company: companyModel,
  students: student_enrollmentModel.array(),
}))
