import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { apiHandler, roleMiddleware, upload } from "../../../../../util/server";

const regex = new RegExp("MarksSheet");

export default apiHandler()
  .use(roleMiddleware("student"))
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const copyBody = { ...req.body };
    for (const prop in copyBody) {
      // TODO: find a better to check if body has files in it
      if (regex.test(prop)) {
        const { secure_url } = await upload(copyBody[prop]);
        copyBody[prop] = secure_url;
      }
    }
    const session = await getSession({ req });
    const result = await prisma.graduation.upsert({
      where: {
        recordId: session?.user.email,
      },
      update: { ...copyBody, recordId: session?.user.email },
      create: { ...copyBody, recordId: session?.user.email },
    });
    return res.status(200).json(result);
  });
