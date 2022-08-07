import { Prisma } from "@prisma/client";

export const defaultUserSelect = Prisma.validator<Prisma.userSelect>()({
  id: true,
  role: true,
  email: true,
  studentRecord: true,
  _count: {
    select: {
      offer: true,
    },
  },
});
