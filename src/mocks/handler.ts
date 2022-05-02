import { rest } from "msw";
import { sampleStudent1 } from "../components/Table/Table.data";

export const studentsHandlers = [
  rest.get("/student", (req, res, ctx) => res(ctx.json(sampleStudent1))),
];

export const handlers = [...studentsHandlers];
