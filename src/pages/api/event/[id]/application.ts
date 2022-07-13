import * as Boom from "@hapi/boom";
import { EventResult } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../../util/server";
import { Session } from "../../auth/[...nextauth]";

export default apiHandler()
  .use(roleMiddleware("student"))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = (await getSession({ req })) as never as Session;
    const { email } = session.user;
    const { event_id } = req.body;

    const isStudentAppliedForEvent = await prisma.student_enrollment.findUnique(
      {
        where: {
          event_id_studentEmail: { event_id, studentEmail: email },
        },
      }
    );
    if (isStudentAppliedForEvent)
      throw Boom.forbidden("You have not applied for this Event");

    if (req.query?.result === EventResult.rejected) {
      await prisma.student_enrollment.update({
        where: {
          event_id_studentEmail: { event_id, studentEmail: email },
        },
        data: {
          result: EventResult.rejected,
        },
      });
      return res.status(201).end();
    }
    if (req.query?.result === EventResult.placed) {
      const { ctc, offer_letter } = req.body;

      const isOfferExist = await prisma.offer.count({
        where: {
          event_id,
          studentEmail: email,
        },
      });
      if (isOfferExist)
        throw Boom.forbidden(
          `You have already uploaded a offer for this Event`
        );
      await Promise.all([
        await prisma.student_enrollment.update({
          where: {
            event_id_studentEmail: { event_id, studentEmail: email },
          },
          data: {
            result: EventResult.placed,
          },
        }),
        await prisma.offer.create({
          data: {
            ctc,
            offer_letter,
            event_id,
            studentEmail: email,
          },
        }),
      ]);

      return res.status(201).end();
    }
    throw Boom.badRequest("Result parameter not provided");
  });
