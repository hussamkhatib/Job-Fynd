import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { studentCols } from "../../store/student.data";
import { profileTabs } from "../../components/NavTabs/tabs";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchStudentProfile = async (usn: string) => {
  const { data } = await axios.get(`/api/student/${usn}`);
  return data;
};

const Overview = () => {
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

  return (
    <div>
      <NavTabs tabs={profileTabs} />
      {data && <Table columns={studentCols} data={data} />}
    </div>
  );
};

export default Overview;
