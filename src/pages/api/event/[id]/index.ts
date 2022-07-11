import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../../util/server";
import { Session } from "../../auth/[...nextauth]";

export default apiHandler()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { id },
    } = req;
    const session = (await getSession({ req })) as never as Session;
    const { role, email } = session.user;
    if (role === Role.student) {
      const [applied, result]: any = await prisma.$transaction([
        prisma.student_enrollment.findUnique({
          where: {
            event_id_studentEmail: { event_id: +id, studentEmail: email },
          },
        }),
        prisma.event.findUnique({
          where: {
            id: +id,
          },
          include: {
            company: {
              select: {
                name: true,
                sector: true,
              },
            },
          },
        }),
      ]);
      result["sector"] = result.company.sector;
      result["company"] = result.company.name;
      return res.status(200).json({ applied: Boolean(applied), result });
    }
    const result: any = await prisma.event.findUnique({
      where: {
        id: +id,
      },
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
    result["sector"] = result.company.sector;
    result["company"] = result.company.name;
    result["offers"] = result._count.offers;
    result["applied"] = result._count.students;
    delete result._count;
    return res.status(200).json(result);
  })
  .patch(
    roleMiddleware("admin"),
    async (req: NextApiRequest, res: NextApiResponse) => {
      const {
        query: { id },
      } = req;
      const session = (await getSession({ req })) as never as Session;
      const { body } = req;
      const { role } = session.user;
      if (role !== Role.admin) return res.status(401).end();
      const result: any = await prisma.event.update({
        where: {
          id: +id,
        },
        include: {
          company: true,
          _count: {
            select: {
              offers: true,
              students: true,
            },
          },
        },
        data: body,
      });
      result["sector"] = result.company.sector;
      result["company"] = result.company.name;
      result["offers"] = result._count.offers;
      result["applied"] = result._count.students;
      delete result._count;
      return res.status(200).json(result);
    }
  )
  .delete(
    roleMiddleware("admin"),
    async (req: NextApiRequest, res: NextApiResponse) => {
      const {
        query: { id },
      } = req;
      await prisma.event.delete({
        where: {
          id: +id,
        },
      });
      return res.status(204).end();
    }
  );
