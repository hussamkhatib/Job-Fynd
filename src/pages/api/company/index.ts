import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";
import APIFilters from "../../../utils/api-filter";
import { Session } from "../auth/[...nextauth]";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const session = (await getSession({ req })) as never as Session;
  if (!session) return res.status(403).end();

  switch (method) {
    case "GET": {
      if (req.query.search) {
        const result = await prisma.company.findMany({
          where: {
            name: {
              search: `${req.query.search}`,
            },
          },
        });
        return res.status(200).json(result);
      }
      const options = {
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
      };
      const { query } = new APIFilters(req.query).pagination();
      const filter = { ...query, ...options };

      const [count, results] = await prisma.$transaction([
        prisma.company.count(),
        prisma.company.findMany(filter),
      ]);
      results.forEach((ele: any) => {
        ele["offers"] = ele.events.reduce((prev: number, cur: any) => {
          return prev + cur._count.offers;
        }, 0);
        delete ele.events;
      });
      return res.status(200).json({ count, results });
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
