import * as z from "zod"
import { Branch } from "@prisma/client"
import { Completeevent, eventModel } from "./index"

export const _branchModel = z.object({
  name: z.nativeEnum(Branch),
  eventId: z.string(),
})

export interface Completebranch extends z.infer<typeof _branchModel> {
  event: Completeevent
}

/**
 * branchModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const branchModel: z.ZodSchema<Completebranch> = z.lazy(() => _branchModel.extend({
  event: eventModel,
}))
