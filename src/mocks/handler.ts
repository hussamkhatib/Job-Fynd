import { rest } from "msw";
import { activeEvents, allEvents } from "../pages/events/events.data";
import { sampleStudent } from "../pages/profile/data";

export const studentsHandlers = [
  rest.get("/student/1", (req, res, ctx) => res(ctx.json(sampleStudent))),
];
export const eventsHandlers = [
  rest.get("/events", (req, res, ctx) => res(ctx.json(allEvents))),
  rest.get("/activeevents", (req, res, ctx) => res(ctx.json(activeEvents))),
];

export const handlers = [...studentsHandlers, ...eventsHandlers];
