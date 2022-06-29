import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { Session } from "../../auth/[...nextauth]";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const session = (await getSession({ req })) as never as Session;
  if (!session) return res.status(403).end();
  const { user } = session;
  if (user?.role === Role.admin) res.status(401).end();

  switch (method) {
    case "PATCH": {
      const result = await prisma.record.upsert({
        where: {
          studentEmail: user.email,
        },
        update: req.body,
        create: {
          ...req.body,
          studentEmail: user.email,
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
