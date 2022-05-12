import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const result: any = await prisma.company.findMany({
        include: {
          offers: true,
        },
      });
      result.forEach((res: any) => {
        res["offers"] = res["offers"].length;
      });
      console.log(result);
      res.status(200).json(result);
      break;
    }
  }
}
