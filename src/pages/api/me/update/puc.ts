import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { apiHandler, roleMiddleware } from "../../../../../util/server";
import { Session } from "../../auth/[...nextauth]";

export default apiHandler()
  .use(roleMiddleware("student"))
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = (await getSession({ req })) as never as Session;
    const { user } = session;
    const result = await prisma.sslcpuc.upsert({
      where: {
        pucRecordId: user.email,
      },
      update: { ...req.body, pucRecordId: user.email },
      create: { ...req.body, pucRecordId: user.email },
    });
    return res.status(200).json(result);
  });
