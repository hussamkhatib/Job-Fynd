import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../util/server";
import APIFilters from "../../../utils/api-filter";

export default apiHandler()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const options = {
      include: {
        company: true,
        _count: {
          select: {
            offers: true,
            students: true,
          },
        },
      },
    };
    const { query } = new APIFilters(req.query).pagination();
    const filter = { ...query, ...options };
    const [count, results] = await prisma.$transaction([
      prisma.event.count(),
      prisma.event.findMany(filter),
    ]);
    results.forEach((ele: any) => {
      ele["sector"] = ele.company.sector;
      ele["company"] = ele.company.name;
      ele["offers"] = ele._count.offers;
      ele["applied"] = ele._count.students;
      delete ele._count;
    });

    return res.status(200).json({ count, results });
  })
  .post(
    roleMiddleware("admin"),
    async (req: NextApiRequest, res: NextApiResponse) => {
      const {
        company_id,
        title,
        ctc,
        type,
        branches_allowed,
        eligibilityOfferCount,
      } = req.body;
      await prisma.event.create({
        data: {
          company_id,
          title,
          ctc,
          type,
          branches_allowed,
          eligibilityOfferCount,
        },
      });

      res.json({ success: true });
    }
  );
