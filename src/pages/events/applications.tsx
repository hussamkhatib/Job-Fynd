import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { studentApplicationEventColumns } from "../../store/events.data";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";
import Alert from "../../components/ui/Alert";
import Error from "next/error";

const Applications = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.admin) return <Error statusCode={403} />;
  return (
    <>
      <NavTabs tabs={studentEventTabs} />
      <StudentApplications />
    </>
  );
};

export default Applications;

const StudentApplications = () => {
  const { isLoading, data, error } = trpc.useQuery(["users.me.applications"]);
  return (
    <div>
      <h1 className="py-4 text-xl font-semibold">Applied Companies</h1>
      {isLoading ? (
        <Loader />
      ) : error instanceof Error ? (
        <Alert>{error.message}</Alert>
      ) : Array.isArray(data) && !data.length ? (
        <span>You have not applied to any events yet.</span>
      ) : data ? (
        <Table columns={studentApplicationEventColumns} data={data} />
      ) : null}
    </div>
  );
};
