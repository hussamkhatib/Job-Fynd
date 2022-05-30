import { Role } from "@prisma/client";
import { NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

export default async function userHandler(req: any, res: NextApiResponse) {
  const {
    query: { status },
    method,
  } = req;

  const session: any = await getSession({ req });
  if (!session) return res.status(403).end();
  if (session.user.role !== Role.admin) return res.status(401).end();

  switch (method) {
    case "GET": {
      const result: any = await prisma.user.findMany({
        where: {
          validated: status,
        },
      });
      res.status(200).json(result);
      break;
    }
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
