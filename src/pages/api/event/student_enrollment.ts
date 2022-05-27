import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // todo: check for status open ,branches allowed , opted in , minimum marks are satisfied
  switch (method) {
    case "POST":
      {
        const { student_id, event_id } = req.body;
        await prisma.student_enrollment.create({
          data: {
            student_id: +student_id,
            event_id: +event_id,
          },
        });
      }
      res.json({ success: true });
      break;
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
