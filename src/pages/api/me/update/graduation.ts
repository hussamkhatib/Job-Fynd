import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../../util/server";

export default apiHandler()
  .use(roleMiddleware("student"))
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const result = await prisma.graduation.upsert({
      where: {
        recordId: session?.user.email,
      },
      update: { ...req.body, recordId: session?.user.email },
      create: { ...req.body, recordId: session?.user.email },
    });
    return res.status(200).json(result);
  });
