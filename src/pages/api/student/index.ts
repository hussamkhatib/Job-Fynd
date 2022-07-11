import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Validation } from "@prisma/client";
import APIFilters from "../../../utils/api-filter";
import { apiHandler } from "../../../../util/server";

export default apiHandler().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const options = {
      where: {
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
      prisma.student.count(options),
      prisma.student.findMany(filter),
    ]);
    return res.status(200).json({ count, results });
  }
);
