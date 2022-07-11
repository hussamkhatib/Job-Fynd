import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { apiHandler } from "../../../../../util/server";

export default apiHandler().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req;
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
    return res.status(200).json(offers);
  }
);
