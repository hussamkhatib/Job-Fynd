import { Role } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import AxiosErrorMsg from "../../components/AxiosErrorMsg";
import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { eventColumns, eventTable } from "../../store/events.data";

const Applications = () => {
  const { data: session }: { data: any } = useSession();
  if (session?.user.role === Role.admin) return null;
  return (
    <div>
      <NavTabs tabs={studentEventTabs} />
      <StudentApplications />
    </div>
  );
};

export default Applications;

const StudentApplications = () => {
  const { isLoading, data, error } = useQuery(
    "studentApplications",
    fetchStudentApplications
  );

  if (isLoading) return <span>Loading...</span>;
  if (error instanceof Error)
    return <AxiosErrorMsg error={error as AxiosError} />;

  if (Array.isArray(data) && !data.length)
    return <span>You have not applied to any events yet.</span>;
  return (
    <Table
      table={eventTable}
      columns={eventColumns}
      data={data}
      state={{ columnVisibility: { id: false } }}
    />
  );
};

const fetchStudentApplications = async () => {
  const { data } = await axios.get(`/api/me/applications`);
  return data;
};
