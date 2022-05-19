import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { q },
  } = req;

  switch (method) {
    case "GET": {
      const result = await prisma.company.findMany({
        where: {
          name: {
            search: `${q}*`,
          },
        },
      });
      res.status(200).json(result);
      break;
    }

    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
