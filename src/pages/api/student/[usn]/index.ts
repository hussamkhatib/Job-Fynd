import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../../util/server";

export default apiHandler()
  .use(roleMiddleware("admin"))
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req;
    const { usn } = query;
    if (Array.isArray(usn)) return res.status(400).end();
    if (req.query?.profile === "full") {
      const result = await prisma.student.findUnique({
        where: {
          usn,
        },
        include: {
          _count: {
            select: {
              offer: true,
            },
          },
          studentRecord: {
            include: {
              sslc: true,
              puc: true,
              diploma: true,
              graduation: true,
            },
          },
        },
      });
      return res.status(200).json(result);
    }
    const result = await prisma.student.findUnique({
      where: {
        usn,
      },
    });
    return res.status(200).json(result);
  })
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const { query, body } = req;
    const { usn } = query;
    if (Array.isArray(usn)) return res.status(400).end();
    const result = await prisma.student.update({
      where: {
        usn,
      },
      include: {
        studentRecord: {
          include: {
            sslc: true,
            puc: true,
            diploma: true,
            graduation: true,
          },
        },
      },
      data: body,
    });
    return res.status(200).json(result);
  });
