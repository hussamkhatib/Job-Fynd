import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { studentColumns, studentTable } from "../../store/student.data";
import { studentsTabs } from "../../components/NavTabs/tabs";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import usePagination from "../../hooks/usePagination";
import AxiosErrorMsg from "../../components/AxiosErrorMsg";

const Students = () => {
  return (
    <div>
      <NavTabs tabs={studentsTabs} />
      <StudentsTable />
    </div>
  );
};

export default Students;

const StudentsTable = () => {
  const { pagination, pageSize, setPagination, fetchDataOptions } =
    usePagination(0, 10);

  const { isLoading, data, error } = useQuery(
    ["students", fetchDataOptions],
    () => fetchStudents(fetchDataOptions)
  );

  if (isLoading) return <span>Loading...</span>;
  if (error instanceof Error)
    return <AxiosErrorMsg error={error as AxiosError} />;

  return (
    <Table
      table={studentTable}
      columns={studentColumns}
      data={data.results}
      setPagination={setPagination}
      state={{ pagination, columnVisibility: { id: false } }}
      pageCount={Math.ceil(data.count / pageSize)}
      manualPagination
    />
  );
};

const fetchStudents = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  const { data } = await axios.get(
    `/api/student?offset=${pageIndex}&limit=${pageSize}`
  );
  return data;
};
