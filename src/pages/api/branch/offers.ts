import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../util/server";

export default apiHandler()
  .use(roleMiddleware("admin"))
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const result: any = await prisma.student.findMany({
      select: {
        branch: true,
        _count: {
          select: {
            offer: true,
          },
        },
      },
    });
    const branchWiseOffers: any = {
      CSE: [0, 0],
      ISE: [0, 0],
      EC: [0, 0],
      EEE: [0, 0],
    };
    // 0 index - unique offer ,1 index - multiple offer
    await result.forEach((res: any) => {
      const branch = res["branch"];
      const count = res["_count"].offer;
      if (count > 1) {
        branchWiseOffers[branch][0]++;
        branchWiseOffers[branch][1]++;
        return;
      }
      if (count === 1) branchWiseOffers[branch][0]++;
    });
    return res.status(200).json(branchWiseOffers);
  });
