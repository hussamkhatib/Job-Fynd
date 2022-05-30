import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const session: any = await getSession({ req });
  if (!session) return res.status(403).end();

  switch (method) {
    case "GET": {
      if (query.search) {
        const result: any = await prisma.company.findMany({
          where: {
            name: {
              search: `${query.search}`,
            },
          },
        });
        return res.status(200).json(result);
      }
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
      return res.status(200).json(result);
    }
    case "POST":
      {
        const { role } = session.user;
        if (role !== Role.admin) return res.status(401).end();
        const { name, sector } = req.body;
        await prisma.company.create({
          data: {
            name,
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
