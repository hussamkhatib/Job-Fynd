import { Session } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import { Maybe } from "@trpc/server";
import * as trpc from "@trpc/server";
import { defaultUserSelect } from "../prisma/selects/user";

export const createContext = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const session = await getSession({ req });

  // prisma.$use(async (params, next) => {
  //   const before = Date.now();

  //   const result = await next(params);
  //   const after = Date.now();
  //   console.log(
  //     `Query ${params.model}.${params.action} took ${after - before}ms`
  //   );
  //   return result;
  // });

  const user = await getUserFromSession(session);
  return { req, res, prisma, user };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

async function getUserFromSession(session: Maybe<Session>) {
  if (!session?.user.id) return null;
  const { id } = session.user;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: defaultUserSelect,
  });
  if (!user || !user?.email) return null;
  return user;
}
