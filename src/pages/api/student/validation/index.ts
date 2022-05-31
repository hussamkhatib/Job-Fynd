import { Validation } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "PATCH": {
      const { idList, isValid } = body;
      const validated = isValid
        ? Validation.validated
        : Validation.notvalidated;
      const result = await prisma.user.updateMany({
        where: {
          id: {
            in: idList,
          },
        },
        data: {
          validated,
        },
      });
      return res.status(200).json(result);
    }
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
