import { Role, Status, Validation } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { Session } from "../../auth/[...nextauth]";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const session = (await getSession({ req })) as never as Session;
  if (!session) return res.status(401).end();
  if (session.user.role === Role.admin) return res.status(403).end();

  switch (method) {
    case "POST": {
      const event_id = +query?.id;
      const { email, validated } = session.user;
      // check if already applied , this ensures createdAt is not updated and avoids unecessary writes.
      let isValid = true;
      const hasStudentAlreadyApplied = await prisma.student_enrollment.count({
        where: {
          event_id,
          studentEmail: email,
        },
      });
      if (hasStudentAlreadyApplied) isValid = false;
      // check if the event is open
      // check if branhes_allowed matches the student branch
      const isStudentEligible = await prisma.event.findFirst({
        where: {
          id: +query?.id,
          status: Status.Open,
        },
        select: {
          branches_allowed: true,
        },
      });
      if (
        !isStudentEligible ||
        (Array.isArray(isStudentEligible?.branches_allowed) &&
          !isStudentEligible.branches_allowed?.includes(
            session?.user?.branch ?? null
          ))
      )
        isValid = false;
      // check if student profile is validated
      if (validated !== Validation.validated) isValid = false;
      if (!isValid) return res.status(403).end();
      await prisma.student_enrollment.create({
        data: {
          event_id: +query?.id,
          studentEmail: email,
        },
      });
      return res.status(201).end();
    }
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
