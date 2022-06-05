import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { studentCols } from "../../store/student.data";
import { studentsTabs } from "../../components/NavTabs/tabs";
import axios from "axios";
import { useQuery } from "react-query";

const fetchStudents = async () => {
  const { data } = await axios.get("/api/student");
  return data;
};

const Students = () => {
  const { isLoading, data, error } = useQuery(["students"], fetchStudents);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div>
      <NavTabs tabs={studentsTabs} />
      <Table columns={studentCols} data={data} />
    </div>
  );
};

export default Students;
