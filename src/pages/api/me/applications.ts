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
    const result = await prisma.student.findUnique({
      where: {
        email: user?.email,
      },
      select: {
        applied_jobs: {
          select: {
            result: true,
            event: {
              include: {
                company: {
                  select: {
                    name: true,
                    sector: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return res.status(200).json(result?.applied_jobs);
  });
