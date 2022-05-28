import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const result: any = await prisma.student.findUnique({
        where: {
          id: 1,
        },
        select: {
          offers: {
            select: {
              ctc: true,
              event: {
                select: {
                  title: true,
                  type: true,
                  company: {
                    select: {
                      name: true,
                      sector: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      const offers = result.offers.map((item: any) => {
        return {
          ctc: item.ctc,
          company: item.event.company.name,
          sector: item.event.company.sector,
          title: item.event.title,
          type: item.event.type,
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
