import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { usn },
    method,
  }: any = req;

  const session: any = await getSession({ req });
  if (!session) return res.status(403).end();
  if (usn !== session.user.usn && session.user.role !== Role.admin)
    return res.status(401).end();

  switch (method) {
    case "GET": {
      const result: any = await prisma.user.findUnique({
        where: {
          usn,
        },
      });
      res.status(200).json(result);
      break;
    }
    case "PATCH": {
      const { name, usn, branch, resume, validated } = req.body;
      const result: any = await prisma.user.update({
        where: {
          usn,
        },
        data: {
          name,
          usn,
          branch,
          resume,
          validated,
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
