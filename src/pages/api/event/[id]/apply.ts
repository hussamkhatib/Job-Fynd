import * as Boom from "@hapi/boom";
import { Status, Validation } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../../util/server";

export default apiHandler().post(
  roleMiddleware("student"),
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    const event_id = req.query?.id;
    if (Array.isArray(event_id))
      throw Boom.badData("You can't apply to multiple events at once");

    // check if already applied , this ensures createdAt is not updated and avoids unecessary writes.
    let isValid = true;
    const hasStudentAlreadyApplied = await prisma.student_enrollment.count({
      where: {
        event_id,
        studentEmail: session?.user?.email,
      },
    });
    if (hasStudentAlreadyApplied) isValid = false;
    // check if the event is open
    // check if branhes_allowed matches the student branch
    const isStudentEligible = await prisma.event.findFirst({
      where: {
        id: event_id,
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
    if (session?.user?.validated !== Validation.validated) isValid = false;
    if (!isValid) return res.status(403).end();
    await prisma.student_enrollment.create({
      data: {
        event_id,
        studentEmail: session!.user.email,
      },
    });
    return res.status(201).end();
  }
);
