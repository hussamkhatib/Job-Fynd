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

  switch (method) {
    case "POST":
      {
        const { email, role, branch, validated } = session.user;

        if (role !== Role.student) return res.status(401).end();

        const event = await prisma.event.findUnique({
          where: {
            id: +id,
          },
        });
        if (
          (event &&
            Array.isArray(event?.branches_allowed) &&
            !event.branches_allowed.includes(branch)) ||
          !validated
        )
          return res.status(403).end();
        await prisma.student_enrollment.create({
          data: {
            student_email: email,
            event_id: +id,
          },
        });
      }
      return res.status(201).end();
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
