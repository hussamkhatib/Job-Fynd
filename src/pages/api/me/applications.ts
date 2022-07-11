import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../util/server";
import { Session } from "../auth/[...nextauth]";

export default apiHandler()
  .use(roleMiddleware("student"))
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = (await getSession({ req })) as never as Session;
    const { user } = session;
    const json: any = await prisma.student.findUnique({
      where: {
        email: user?.email,
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
