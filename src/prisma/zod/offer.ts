import * as z from "zod"
import { Completeuser, userModel, Completeevent, eventModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _offerModel = z.object({
  id: z.string(),
  ctc: z.string(),
  offer_letter: jsonSchema,
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
