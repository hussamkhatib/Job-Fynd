import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const session: any = await getSession({ req });
  if (!session) return res.status(403).end();
  const { role } = session.user;
  if (role !== Role.admin) return res.status(401).end();

  switch (method) {
    case "GET": {
      const result: any = await prisma.user.findMany({
        where: {
          role: Role.student,
        },
        select: {
          branch: true,
          _count: {
            select: {
              offers: true,
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
      await result.forEach((res: any) => {
        const branch = res["branch"];
        const count = res["_count"].offers;
        count
          ? branchWisePlacedNonPlaced[branch][0]++
          : branchWisePlacedNonPlaced[branch][1]++;
      });
      res.status(200).json(branchWisePlacedNonPlaced);
      break;
    }

    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
