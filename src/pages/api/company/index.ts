import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
// TODO convert to trpc

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.search) {
    const result = await prisma.company.findMany({
      where: {
        name: {
          search: `${req.query.search}`,
        },
      },
    });
    return res.status(200).json(result);
  }
}
