import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { Session } from "../../auth/[...nextauth]";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req;

  const session = (await getSession({ req })) as never as Session;
  if (!session) return res.status(403).end();
  if (session.user.role !== Role.admin) return res.status(401).end();

  switch (method) {
    case "GET": {
      const { usn } = query;
      if (Array.isArray(usn)) return res.status(400).end();
      if (req.query?.profile === "full") {
        const result = await prisma.student.findUnique({
          where: {
            usn,
          },
          include: {
            _count: {
              select: {
                offer: true,
              },
            },
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
          usn,
        },
      });
      return res.status(200).json(result);
    }
    case "PATCH": {
      const { usn } = query;
      if (Array.isArray(usn)) return res.status(400).end();
      const result = await prisma.student.update({
        where: {
          usn,
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
        data: body,
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
