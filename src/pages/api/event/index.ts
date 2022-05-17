import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const result: any = await prisma.event.findMany({
        include: {
          company: true,
        },
      });
      result.forEach((ele: any) => {
        ele["sector"] = ele.company.sector;
        ele["company"] = ele.company.name;
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
