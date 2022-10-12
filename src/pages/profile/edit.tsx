import EditStudentProfile from "../../components/EditStudentProfile";
import NavTabs from "../../components/NavTabs";
import { profileTabs } from "../../components/NavTabs/tabs";
import Error from "next/error";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";

const Edit = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.admin) return <Error statusCode={403} />;

  return (
    <>
      <NavTabs tabs={profileTabs} />
      <EditStudentProfile />
    </>
  );
};

export default Edit;
