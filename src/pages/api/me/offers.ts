import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";
import { Session } from "../auth/[...nextauth]";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const session = (await getSession({ req })) as never as Session;
  if (!session) return res.status(403).end();
  if (session.user.role === Role.admin) return res.status(401).end();

  switch (method) {
    case "GET": {
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
    }
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
