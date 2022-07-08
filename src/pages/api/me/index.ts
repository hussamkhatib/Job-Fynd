import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";
import { Session } from "../auth/[...nextauth]";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const session = (await getSession({ req })) as never as Session;
  if (!session) return res.status(403).end();
  const { user } = session;
  if (user?.role === Role.admin) res.status(401).end();

  switch (method) {
    case "GET": {
      if (req.query?.profile === "full") {
        const result = await prisma.student.findUnique({
          where: {
            email: user?.email,
          },
          select: {
            name: true,
            usn: true,
            branch: true,
            gender: true,
            email: true,
            image: true,
            opted: true,
            _count: {
              select: {
                offer: true,
              },
            },
            validated: true,
            studentRecord: {
              select: {
                resume: true,
                phoneNumber: true,
                parentsPhoneNumber: true,
                PermanentAddress: true,
                currentAddress: true,
                pinCode: true,
                bloodGroup: true,
                panCardNumber: true,
                voterId: true,
                adharCard: true,
                passportNumber: true,
                sslc: {
                  select: {
                    board: true,
                    scoreType: true,
                    score: true,
                    marksSheet: true,
                  },
                },
                puc: {
                  select: {
                    board: true,
                    scoreType: true,
                    score: true,
                    marksSheet: true,
                  },
                },
                diploma: {
                  select: {
                    sem1: true,
                    sem1MarksSheet: true,
                    sem2: true,
                    sem2MarksSheet: true,
                    sem3: true,
                    sem3MarksSheet: true,
                    sem4: true,
                    sem4MarksSheet: true,
                    sem5: true,
                    sem5MarksSheet: true,
                    sem6: true,
                    sem6MarksSheet: true,
                  },
                },
                graduation: {
                  select: {
                    sem1: true,
                    sem1MarksSheet: true,
                    sem2: true,
                    sem2MarksSheet: true,
                    sem3: true,
                    sem3MarksSheet: true,
                    sem4: true,
                    sem4MarksSheet: true,
                    sem5: true,
                    sem5MarksSheet: true,
                    sem6: true,
                    sem6MarksSheet: true,
                    sem7: true,
                    sem7MarksSheet: true,
                    sem8: true,
                    sem8MarksSheet: true,
                  },
                },
              },
            },
          },
        });

        return res.status(200).json(result);
      }
      const result = await prisma.student.findUnique({
        where: {
          email: user?.email,
        },
      });
      return res.status(200).json(result);
    }

    default: {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }
}
