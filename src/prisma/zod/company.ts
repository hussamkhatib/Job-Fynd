import * as z from "zod"
import { Completeevent, eventModel } from "./index"

export const _companyModel = z.object({
  id: z.string(),
  name: z.string(),
  sector: z.string(),
})

export interface Completecompany extends z.infer<typeof _companyModel> {
  events: Completeevent[]
}

/**
 * companyModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const companyModel: z.ZodSchema<Completecompany> = z.lazy(() => _companyModel.extend({
  events: eventModel.array(),
}))
