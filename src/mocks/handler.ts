import { rest } from "msw";
import { allEvents } from "../components/pages/Events/events.data";
import { sampleStudent1 } from "../components/Table/Table.data";

export const studentsHandlers = [
  rest.get("/student", (req, res, ctx) => res(ctx.json(sampleStudent1))),
];
export const eventsHandlers = [
  rest.get("/events", (req, res, ctx) => res(ctx.json(allEvents))),
];

export const handlers = [...studentsHandlers, ...eventsHandlers];
