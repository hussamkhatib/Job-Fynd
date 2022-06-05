import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { studentCols } from "../../store/student.data";
import { profileTabs } from "../../components/NavTabs/tabs";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axios from "axios";

const Overview = () => {
  return (
    <div>
      <NavTabs tabs={profileTabs} />
      <StudentOverviewTable />
    </div>
  );
};

export default Overview;

const StudentOverviewTable = () => {
  const { data: session }: { data: any } = useSession();
  const { usn } = session.user;
  const { isLoading, data, error } = useQuery(
    ["studentProfile", usn],
    () => fetchStudentProfile(usn),
    {
      select: (data) => [data],
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  return data ? <Table columns={studentCols} data={data} /> : null;
};

const fetchStudentProfile = async (usn: string) => {
  const { data } = await axios.get(`/api/student/${usn}`);
  return data;
};
