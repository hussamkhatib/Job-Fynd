import { Role } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { eventCols } from "../../store/events.data";

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
  const { data: session }: { data: any } = useSession();
  const { usn } = session.user;

  const { isLoading, data, error } = useQuery(
    ["studentApplications", usn],
    () => fetchStudentApplications(usn)
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  if (Array.isArray(data) && !data.length)
    return <span>You have not applied to any events yet.</span>;
  return <Table columns={eventCols} data={data} />;
};

const fetchStudentApplications = async (usn: string) => {
  const { data } = await axios.get(`/api/student/${usn}/applications`);
  return data;
};
