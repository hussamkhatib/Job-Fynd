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
  const { role } = session.user;
  if (role !== Role.admin) return res.status(401).end();

  switch (method) {
    case "GET": {
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
      res.status(200).json(branchWiseOffers);
      break;
    }

    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
