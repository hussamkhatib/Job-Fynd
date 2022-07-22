import * as Boom from "@hapi/boom";
import { EventResult } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { apiHandler, roleMiddleware, upload } from "../../../../../util/server";

export default apiHandler()
  .use(roleMiddleware("student"))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const event_id = req.query.id;
    if (Array.isArray(event_id))
      throw Boom.badData("updating multiple event applications not allowed");

    const isStudentAppliedForEvent = await prisma.student_enrollment.findUnique(
      {
        where: {
          event_id_studentEmail: {
            event_id,
            studentEmail: session!.user?.email,
          },
        },
      }
    );
    if (!isStudentAppliedForEvent)
      throw Boom.forbidden("You have not applied for this Event");
    if (req.body?.result === EventResult.rejected) {
      await prisma.student_enrollment.update({
        where: {
          event_id_studentEmail: {
            event_id,
            studentEmail: session!.user?.email,
          },
        },
        data: {
          result: EventResult.rejected,
        },
      });
      return res.status(201).end();
    }
    if (req.body?.result === EventResult.placed) {
      const { ctc, offer_letter } = req.body;

      const isOfferExist = await prisma.offer.count({
        where: {
          event_id,
          studentEmail: session!.user?.email,
        },
      });
      if (isOfferExist)
        throw Boom.forbidden(
          `You have already uploaded a offer for this Event`
        );

      const { secure_url } = await upload(offer_letter);
      await Promise.all([
        await prisma.student_enrollment.update({
          where: {
            event_id_studentEmail: {
              event_id,
              studentEmail: session!.user?.email,
            },
          },
          data: {
            result: EventResult.placed,
          },
        }),
        await prisma.offer.create({
          data: {
            ctc,
            offer_letter: secure_url,
            event_id,
            studentEmail: session!.user?.email,
          },
        }),
      ]);

      return res.status(201).end();
    }
    throw Boom.badRequest("Result parameter not provided");
  });
