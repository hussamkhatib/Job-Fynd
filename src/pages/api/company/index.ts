import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../util/server";
import APIFilters from "../../../utils/api-filter";

export default apiHandler()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
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
  })
  .post(
    roleMiddleware("admin"),
    async (req: NextApiRequest, res: NextApiResponse) => {
      const { name, sector } = req.body;
      await prisma.company.create({
        data: {
          name,
          sector,
        },
      });
      res.status(200).json({ sucess: true });
    }
  );
