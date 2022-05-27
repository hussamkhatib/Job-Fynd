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
      });
      res.status(200).json(result);
      break;
    }
    case "POST": {
      const { name, usn, email, branch, resume, validated } = req.body;
      const result: any = await prisma.student.update({
        where: {
          id: +id,
        },
        data: {
          name,
          usn,
          email,
          branch,
          resume,
          validated,
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
