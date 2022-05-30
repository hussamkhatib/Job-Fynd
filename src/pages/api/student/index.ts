import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Role } from "@prisma/client";
import { getSession } from "next-auth/react";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const session: any = await getSession({ req });
  if (!session) return res.status(403).end();

  switch (method) {
    case "GET": {
      const result: any = await prisma.user.findMany({
        where: {
          role: Role.student,
        },
      });
      return res.status(200).json(result);
    }
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
