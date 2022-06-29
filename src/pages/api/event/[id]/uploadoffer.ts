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
  if (session.user.role === Role.admin) return res.status(401).end();

  switch (method) {
    case "POST": {
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
    }
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
