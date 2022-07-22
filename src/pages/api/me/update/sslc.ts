import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { apiHandler, roleMiddleware, upload } from "../../../../../util/server";

export default apiHandler()
  .use(roleMiddleware("student"))
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const copyBody = { ...req.body };
    const marksSheet =
      req.body?.marksSheet && (await upload(req.body.marksSheet));
    if (marksSheet) copyBody.marksSheet = marksSheet.secure_url;
    const result = await prisma.sslcpuc.upsert({
      where: {
        sslcrecordId: session?.user.email,
      },
      update: { ...copyBody, sslcrecordId: session?.user.email },
      create: { ...copyBody, sslcrecordId: session?.user.email },
    });
    return res.status(200).json(result);
  });
