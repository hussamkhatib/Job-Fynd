import * as z from "zod"
import { Status, EligibiltyOfferCount } from "@prisma/client"
import { Completebranch, branchModel, Completeoffer, offerModel, Completecompany, companyModel, CompletestudentEnrollment, studentEnrollmentModel } from "./index"

export const _eventModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  title: z.string(),
  ctc: z.number(),
  type: z.string(),
  status: z.nativeEnum(Status),
  eligibilityOfferCount: z.nativeEnum(EligibiltyOfferCount),
  companyId: z.string(),
})

export interface Completeevent extends z.infer<typeof _eventModel> {
  branchesAllowed: Completebranch[]
  offers: Completeoffer[]
  company: Completecompany
  students: CompletestudentEnrollment[]
}

/**
 * eventModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const eventModel: z.ZodSchema<Completeevent> = z.lazy(() => _eventModel.extend({
  branchesAllowed: branchModel.array(),
  offers: offerModel.array(),
  company: companyModel,
  students: studentEnrollmentModel.array(),
}))
