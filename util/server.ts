import nc from "next-connect";
import * as Boom from "@hapi/boom";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Role } from "@prisma/client";
import cloudinary from "cloudinary";

const authMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const session = await getSession({ req });
  if (!session) throw Boom.unauthorized("Please login first");
  next();
};

export const apiHandler = () =>
  nc<NextApiRequest, NextApiResponse>({
    onError(err, req, res) {
      if (Boom.isBoom(err)) {
        console.log(err);
        res.status(err.output.payload.statusCode);
        res.json({
          error: err.output.payload.error,
          message: err.output.payload.message,
        });
      } else {
        res.status(500);
        res.json({
          message: "Unexpected error",
        });
        console.error(err);
        // unexcepted error
      }
    },
  }).use(authMiddleware); // there are no public routes in this app, hence authMiddlerware

export const roleMiddleware =
  (role: Role) =>
  async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const session = await getSession({ req });
    if (session?.user?.role !== role)
      throw Boom.forbidden(`You dont have permission to access this resource`);
    next();
  };

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = async (file: string) =>
  await cloudinary.v2.uploader.upload(file, {
    folder: process.env.CLOUDINARY_FOLDER,
  });
