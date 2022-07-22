import NavTabs from "../../components/NavTabs";
import { studentsTabs } from "../../components/NavTabs/tabs";
import { studentColumns } from "../../store/student.data";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import Table from "../../components/Table";
import usePagination from "../../hooks/usePagination";
import AxiosErrorMsg from "../../components/AxiosErrorMsg";

const ValidateStudents = () => {
  return (
    <div>
      <NavTabs tabs={studentsTabs} />
      <ValidateStudentTable />
    </div>
  );
};

export default ValidateStudents;

const ValidateStudentTable = () => {
  const { pagination, pageSize, setPagination, fetchDataOptions } =
    usePagination(0, 10);
  const { isLoading, data, error } = useQuery(
    ["validationPendingStduents", fetchDataOptions],
    () => fetchValidationPendingStudents(fetchDataOptions)
  );

  if (isLoading) return <span>Loading...</span>;
  if (error instanceof Error)
    return <AxiosErrorMsg error={error as AxiosError} />;

  if (Array.isArray(data) && !data.length) {
    return <h1>No pending validation left</h1>;
  }

  return (
    <Table
      columns={studentColumns}
      data={data.results}
      setPagination={setPagination}
      state={{ pagination, columnVisibility: { id: false } }}
      pageCount={Math.ceil(data.count / pageSize)}
      manualPagination
    />
  );
};

const fetchValidationPendingStudents = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  const { data } = await axios.get(
    `/api/student?validated=pending&offset=${pageIndex}&limit=${pageSize}`
  );
  return data;
};
