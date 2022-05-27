import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET": {
      const result: any = await prisma.student_enrollment.findMany({
        where: {
          event_id: +query.id,
        },
        include: {
          student: true,
        },
      });
      const students = result.map((item: any) => item.student);
      res.status(200).json(students);
      break;
    }
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
