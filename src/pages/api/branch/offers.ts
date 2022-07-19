import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../util/server";

export default apiHandler()
  .use(roleMiddleware("admin"))
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await prisma.$queryRaw`
    SELECT branch,
    sum(cnt >=1) AS unique_offer,
    sum(cnt > 1) AS multiple_offer
    FROM (
      SELECT s.branch, count(o.studentEmail) AS cnt
      FROM student s
      RIGHT JOIN offer o ON o.studentEmail = s.email
      GROUP BY s.branch, s.email 
      ) t
    GROUP BY branch;`;

    return res.status(200).json(result);
  });
