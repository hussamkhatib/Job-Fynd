import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET": {
      const json: any = await prisma.student.findUnique({
        where: {
          id: +id,
        },
        select: {
          applied_jobs: {
            select: {
              event: {
                include: {
                  company: true,
                },
              },
            },
          },
        },
      });
      const result = json.applied_jobs.map((data: any) => data.event);
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
