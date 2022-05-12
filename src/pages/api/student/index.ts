import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const result: any = await prisma.student.findMany({
        include: {
          branch: true,
        },
      });
      result.forEach((res: any) => {
        res["branch"] = res?.branch.name;
      });
      res.status(200).json(result);
      break;
    }
  }
}
