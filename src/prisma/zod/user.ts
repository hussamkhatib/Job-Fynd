import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteSession, SessionModel, CompleteAccount, AccountModel, Completestudent, studentModel } from "./index"

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
  details?: Completestudent | null
}

/**
 * userModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const userModel: z.ZodSchema<Completeuser> = z.lazy(() => _userModel.extend({
  Session: SessionModel.array(),
  account: AccountModel.array(),
  details: studentModel.nullish(),
}))
