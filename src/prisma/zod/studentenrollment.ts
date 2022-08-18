import * as z from "zod"
import { EventResult } from "@prisma/client"
import { Completeevent, eventModel, Completeuser, userModel } from "./index"

export const _studentEnrollmentModel = z.object({
  createdAt: z.date(),
  result: z.nativeEnum(EventResult),
  eventId: z.string(),
  studentId: z.string(),
})

export interface CompletestudentEnrollment extends z.infer<typeof _studentEnrollmentModel> {
  event: Completeevent
  student?: Completeuser | null
}

/**
 * studentEnrollmentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const studentEnrollmentModel: z.ZodSchema<CompletestudentEnrollment> = z.lazy(() => _studentEnrollmentModel.extend({
  event: eventModel,
  student: userModel.nullish(),
}))
