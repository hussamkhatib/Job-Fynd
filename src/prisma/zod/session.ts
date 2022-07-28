import * as z from "zod"
import { Completeuser, userModel } from "./index"

export const _SessionModel = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
})

export interface CompleteSession extends z.infer<typeof _SessionModel> {
  user: Completeuser
}

/**
 * SessionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const SessionModel: z.ZodSchema<CompleteSession> = z.lazy(() => _SessionModel.extend({
  user: userModel,
}))
