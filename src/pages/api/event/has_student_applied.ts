import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET": {
      const result: any = await prisma.student_enrollment.findUnique({
        where: {
          event_id_student_id: { event_id: +query.id, student_id: 1 },
        },
      });
      if (result) res.status(200).json({ success: true });
      //todo: replace else status code with proper code
      else res.status(200).json({ success: false });
      break;
    }
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
