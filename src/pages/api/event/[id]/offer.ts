import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET": {
      const result: any = await prisma.offer.findMany({
        where: {
          event_id: +query.id,
        },
        include: {
          student: {
            select: {
              name: true,
              branch: true,
              usn: true,
            },
          },
        },
      });
      const offers = result.map((item: any) => {
        return {
          ctc: item.ctc,
          name: item.student.name,
          branch: item.student.branch,
          usn: item.student.usn,
        };
      });
      res.status(200).json(offers);
      break;
    }
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
