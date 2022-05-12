import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET": {
      const result: any = await prisma.student.findUnique({
        where: {
          id: +id,
        },
        include: {
          branch: true,
        },
      });
      result["branch"] = result?.branch.name;
      res.status(200).json([result]);
      break;
    }
  }
}
