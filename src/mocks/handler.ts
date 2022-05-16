import { rest } from "msw";
import { allEvents } from "../store/events.data";
import { sampleStudent } from "../store/profile.data";

export const studentsHandlers = [
  rest.get("/student/1", (req, res, ctx) => res(ctx.json(sampleStudent))),
];
export const eventsHandlers = [
  rest.get("/event", (req, res, ctx) => res(ctx.json(allEvents))),
];

export const handlers = [...studentsHandlers, ...eventsHandlers];
