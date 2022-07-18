import * as Boom from "@hapi/boom";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { apiHandler } from "../../../../../util/server";

export default apiHandler().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { id },
    } = req;
    if (Array.isArray(id))
      throw Boom.badData("accessing multiple companies not allowed");
    const result: any = await prisma.company.findUnique({
      where: {
        id,
      },
      include: {
        events: {
          select: {
            _count: {
              select: {
                offers: true,
              },
            },
          },
        },
      },
    });

    result["offers"] = result.events.reduce((prev: number, cur: any) => {
      return prev + cur._count.offers;
    }, 0);
    delete result.events;
    return res.status(200).json(result);
  }
);
