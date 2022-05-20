import { NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function userHandler(req: any, res: NextApiResponse) {
  const {
    query: { status },
    method,
  } = req;
  switch (method) {
    case "GET": {
      const result: any = await prisma.student.findMany({
        where: {
          validated: status,
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
