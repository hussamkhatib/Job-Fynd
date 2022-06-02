import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;
  const session: any = await getSession({ req });
  if (!session) return res.status(403).end();

  // todo: check for status open ,branches allowed , opted in , minimum marks are satisfied
  switch (method) {
    case "POST":
      {
        const { email, role } = session.user;
        if (role !== Role.student) return res.status(401).end();

        await prisma.student_enrollment.create({
          data: {
            student_email: email,
            event_id: +id,
          },
        });
      }
      res.json({ success: true });
      break;
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}