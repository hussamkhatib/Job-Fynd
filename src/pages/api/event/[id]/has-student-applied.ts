import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const session: any = await getSession({ req });
  if (!session) return res.status(403).end();
  const { role, email } = session.user;
  if (role !== Role.student) return res.status(401).end();

  switch (method) {
    case "GET": {
      const result: any = await prisma.student_enrollment.findUnique({
        where: {
          event_id_student_email: { event_id: +query.id, student_email: email },
        },
      });
      if (result) return res.status(200).json({ success: true });
      //todo: replace else status code with proper code
      else return res.status(200).json({ success: false });
    }
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
