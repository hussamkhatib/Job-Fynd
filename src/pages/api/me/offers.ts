import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../util/server";
import { Session } from "../auth/[...nextauth]";

export default apiHandler()
  .use(roleMiddleware("student"))
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = (await getSession({ req })) as never as Session;
    const result: any = await prisma.student.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        offer: {
          select: {
            ctc: true,
            offer_letter: true,
            event: {
              select: {
                title: true,
                type: true,
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
    const offers = result.offer?.map((item: any) => {
      return {
        ctc: item.ctc,
        company: item.event.company.name,
        sector: item.event.company.sector,
        offer_letter: item.offer_letter,
        title: item.event.title,
        type: item.event.type,
      };
    });

    return res.status(200).json(offers || { offers: [] });
  });
