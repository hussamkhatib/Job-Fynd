import { rest } from "msw";
import {
  activeEvents,
  allEvents,
} from "../components/pages/Events/events.data";
import { sampleStudent1 } from "../components/pages/Profile/data";

export const studentsHandlers = [
  rest.get("/student", (req, res, ctx) => res(ctx.json(sampleStudent1))),
];
export const eventsHandlers = [
  rest.get("/events", (req, res, ctx) => res(ctx.json(allEvents))),
  rest.get("/activeevents", (req, res, ctx) => res(ctx.json(activeEvents))),
];

export const handlers = [...studentsHandlers, ...eventsHandlers];
