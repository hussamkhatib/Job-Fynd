import * as z from "zod"
import { Completestudent_enrollment, student_enrollmentModel, Completeoffer, offerModel, Completeuser, userModel, Completerecord, recordModel } from "./index"

export const _studentModel = z.object({
  userId: z.string(),
})

export interface Completestudent extends z.infer<typeof _studentModel> {
  applied_jobs: Completestudent_enrollment[]
  offer: Completeoffer[]
  user?: Completeuser | null
  studentRecord?: Completerecord | null
}

/**
 * studentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const studentModel: z.ZodSchema<Completestudent> = z.lazy(() => _studentModel.extend({
  applied_jobs: student_enrollmentModel.array(),
  offer: offerModel.array(),
  user: userModel.nullish(),
  studentRecord: recordModel.nullish(),
}))
