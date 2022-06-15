import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Role, Validation } from "@prisma/client";
import { getSession } from "next-auth/react";
import APIFilters from "../../../utils/api-filter";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const session: any = await getSession({ req });
  if (!session) return res.status(403).end();

  switch (method) {
    case "GET": {
      const options = {
        where: {
          role: Role.student,
          ...(!Array.isArray(req.query.validated) &&
            ["pending", "notvalidated", "validated"].includes(
              req.query.validated
            ) && {
              validated: req.query.validated as Validation,
            }),
        },
      };

      const { query } = new APIFilters(req.query).pagination();
      const filter = { ...options, ...query };

      const [count, results] = await prisma.$transaction([
        prisma.user.count(options),
        prisma.user.findMany(filter),
      ]);
      return res.status(200).json({ count, results });
    }
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
