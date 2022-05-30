import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

// use to fetch particaular user applications
export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { usn },
  }: any = req;
  const session: any = await getSession({ req });
  if (!session) return res.status(403).end();
  if (usn !== session.user.usn && session.user.role !== Role.admin)
    return res.status(401).end();

  switch (method) {
    case "GET": {
      const json: any = await prisma.user.findUnique({
        where: {
          usn,
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
