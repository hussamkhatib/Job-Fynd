import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const result: any = await prisma.company.findMany({
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

      result.forEach((ele: any) => {
        ele["offers"] = ele.events.reduce((prev: number, cur: any) => {
          return prev + cur._count.offers;
        }, 0);
        delete ele.events;
      });
      res.status(200).json(result);
      break;
    }
    case "POST":
      {
        const { name, logo, sector } = req.body;
        await prisma.company.create({
          data: {
            name,
            logo,
            sector,
          },
        });
      }
      res.status(200).json({ sucess: true });
      break;
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
