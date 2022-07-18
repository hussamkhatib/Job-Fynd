import * as Boom from "@hapi/boom";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { apiHandler } from "../../../../../util/server";

export default apiHandler().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const event_id = req.query.id;
    if (Array.isArray(event_id))
      throw Boom.badData("accessing multiple companies not allowed");
    const result = await prisma.student_enrollment.findMany({
      where: {
        event_id,
      },
      include: {
        student: true,
      },
    });
    const students = result.map((item) => item.student);
    return res.status(200).json(students);
  }
);
