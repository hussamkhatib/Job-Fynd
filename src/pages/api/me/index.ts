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
  const { user } = session;
  if (user?.role === Role.admin) res.status(401).end();

  switch (method) {
    case "GET": {
      if (req.query?.profile === "full") {
        const result = await prisma.student.findUnique({
          where: {
            email: user?.email,
          },
          include: {
            studentRecord: {
              include: {
                sslc: true,
                puc: true,
                diploma: true,
                graduation: true,
              },
            },
          },
        });
        return res.status(200).json(result);
      }
      const result = await prisma.student.findUnique({
        where: {
          email: user?.email,
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
