import * as Boom from "@hapi/boom";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { apiHandler } from "../../../../../util/server";

export default apiHandler().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const event_id = req.query?.id;
    if (Array.isArray(event_id))
      throw Boom.badData("accessing multiple companies not allowed");
    const result = await prisma.offer.findMany({
      where: {
        event_id,
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
    const offers = result.map((item) => {
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
