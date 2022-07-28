import * as z from "zod"
import { EventResult } from "@prisma/client"
import { Completeevent, eventModel, Completestudent, studentModel } from "./index"

export const _student_enrollmentModel = z.object({
  createdAt: z.date(),
  result: z.nativeEnum(EventResult),
  event_id: z.string(),
  studentId: z.string(),
})

export interface Completestudent_enrollment extends z.infer<typeof _student_enrollmentModel> {
  event: Completeevent
  student?: Completestudent | null
}

/**
 * student_enrollmentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const student_enrollmentModel: z.ZodSchema<Completestudent_enrollment> = z.lazy(() => _student_enrollmentModel.extend({
  event: eventModel,
  student: studentModel.nullish(),
}))
