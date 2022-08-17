import { Role } from "@prisma/client";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import { FC } from "react";
import EditStudentProfile from "../components/EditStudentProflle";
import prisma from "../lib/prisma";
import { defaultUserSelect } from "../prisma/selects/user";

const GettingStarted: FC = ({ user }: any) => {
  return (
    <div>
      {user?.studentRecord?.name && (
        <h1>Welcome {user.studentRecord.name} !</h1>
      )}
      <EditStudentProfile />
    </div>
  );
};

export default GettingStarted;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session?.user?.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: defaultUserSelect,
  });

  if (user?.studentRecord || user?.role === Role.admin)
    return { redirect: { permanent: false, destination: "/dashboard" } };
  return {
    props: {
      user,
    },
  };
};
