import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      {
        const result: any = await prisma.event.findUnique({
          where: {
            id: +id,
          },
          include: {
            company: true,
          },
        });
        res.status(200).json(result);
      }
      break;
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
