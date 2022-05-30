import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const session: any = await getSession({ req });
  if (!session) return res.status(403).end();

  switch (method) {
    case "GET": {
      const result: any = await prisma.event.findMany({
        include: {
          company: true,
          _count: {
            select: {
              offers: true,
              students: true,
            },
          },
        },
      });
      result.forEach((ele: any) => {
        ele["sector"] = ele.company.sector;
        ele["company"] = ele.company.name;
        ele["offers"] = ele._count.offers;
        ele["applied"] = ele._count.students;
        delete ele._count;
      });

      res.status(200).json(result);
      break;
    }
    case "POST":
      {
        const { role } = session.user;
        if (role !== Role.admin) return res.status(401).end();
        const { company_id, title, ctc, type, branches_allowed } = req.body;
        await prisma.event.create({
          data: {
            company_id,
            title,
            ctc,
            type,
            branches_allowed,
          },
        });
      }
      res.json({ success: true });
      break;
    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
