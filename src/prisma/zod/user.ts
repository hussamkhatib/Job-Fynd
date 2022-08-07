import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteSession, SessionModel, CompleteAccount, AccountModel, Completestudent_enrollment, student_enrollmentModel, Completeoffer, offerModel, Completerecord, recordModel } from "./index"

export const _userModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.nativeEnum(Role),
  email: z.string(),
  emailVerified: z.boolean().nullish(),
})

export interface Completeuser extends z.infer<typeof _userModel> {
  Session: CompleteSession[]
  account: CompleteAccount[]
  applied_jobs: Completestudent_enrollment[]
  offer: Completeoffer[]
  studentRecord?: Completerecord | null
}

/**
 * userModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const userModel: z.ZodSchema<Completeuser> = z.lazy(() => _userModel.extend({
  Session: SessionModel.array(),
  account: AccountModel.array(),
  applied_jobs: student_enrollmentModel.array(),
  offer: offerModel.array(),
  studentRecord: recordModel.nullish(),
}))
