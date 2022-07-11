import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../util/server";

export default apiHandler()
  .use(roleMiddleware("admin"))
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await prisma.student.findMany({
      select: {
        branch: true,
        _count: {
          select: {
            offer: true,
          },
        },
      },
    });
    const branchWisePlacedNonPlaced: any = {
      CSE: [0, 0],
      ISE: [0, 0],
      EC: [0, 0],
      EEE: [0, 0],
    };
    // 0 index - placed ,1 index - non-placed
    result.forEach((res: any) => {
      const branch = res["branch"];
      const count = res["_count"].offers;
      count
        ? branchWisePlacedNonPlaced[branch][0]++
        : branchWisePlacedNonPlaced[branch][1]++;
    });
    return res.status(200).json(branchWisePlacedNonPlaced);
  });
