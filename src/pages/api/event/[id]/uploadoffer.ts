import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../../util/server";
import { Session } from "../../auth/[...nextauth]";

export default apiHandler()
  .use(roleMiddleware("student"))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = (await getSession({ req })) as never as Session;
    const { ctc, offer_letter, event_id } = req.body;
    await prisma.offer.create({
      data: {
        ctc,
        offer_letter,
        event_id,
        studentEmail: session.user.email,
      },
    });
    return res.status(201).end();
  });
