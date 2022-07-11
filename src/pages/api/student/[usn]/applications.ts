import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../../util/server";

export default apiHandler()
  .use(roleMiddleware("admin"))
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { usn },
    }: any = req;
    const json: any = await prisma.student.findUnique({
      where: {
        usn,
      },
      select: {
        applied_jobs: {
          select: {
            event: {
              include: {
                company: true,
              },
            },
          },
        },
      },
    });
    const result = json.applied_jobs.map((data: any) => data.event);
    result.forEach((ele: any) => {
      ele["sector"] = ele.company.sector;
      ele["company"] = ele.company.name;
    });
    return res.status(200).json(result);
  });
