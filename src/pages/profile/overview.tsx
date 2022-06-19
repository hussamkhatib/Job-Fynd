import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { studentColumns, studentTable } from "../../store/student.data";
import { profileTabs } from "../../components/NavTabs/tabs";
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
  const { isLoading, data, error } = useQuery(
    ["studentProfile"],
    fetchStudentProfile,
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
  return data ? (
    <Table
      table={studentTable}
      columns={studentColumns}
      data={data}
      state={{ columnVisibility: { id: false } }}
    />
  ) : null;
};

const fetchStudentProfile = async () => {
  const { data } = await axios.get(`/api/me`);
  return data;
};
