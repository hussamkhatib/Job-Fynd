import * as z from "zod"
import { Completeuser, userModel, Completeevent, eventModel } from "./index"

export const _offerModel = z.object({
  id: z.string(),
  ctc: z.string(),
  offer_letter: z.string(),
  studentId: z.string(),
  event_id: z.string(),
})

export interface Completeoffer extends z.infer<typeof _offerModel> {
  student: Completeuser
  event: Completeevent
}

/**
 * offerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const offerModel: z.ZodSchema<Completeoffer> = z.lazy(() => _offerModel.extend({
  student: userModel,
  event: eventModel,
}))
