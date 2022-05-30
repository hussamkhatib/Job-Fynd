import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;
  const session: any = await getSession({ req });
  if (!session) return res.status(403).end();
  switch (method) {
    case "GET": {
      const result: any = await prisma.company.findUnique({
        where: {
          id: +id,
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
      res.status(200).json(result);
      break;
    }

    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
