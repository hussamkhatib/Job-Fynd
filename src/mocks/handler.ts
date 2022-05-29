import { rest } from "msw";
import { sampleStudent } from "../store/student.data";

export const studentsHandlers = [
  rest.get("/student/1", (req, res, ctx) => res(ctx.json(sampleStudent))),
];

export const handlers = [...studentsHandlers];
