import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { apiHandler } from "../../../../../util/server";

export default apiHandler().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req;
    const result: any = await prisma.student_enrollment.findMany({
      where: {
        event_id: +query.id,
      },
      include: {
        student: true,
      },
    });
    const students = result.map((item: any) => item.student);
    return res.status(200).json(students);
  }
);
