import NavTabs from "../../components/NavTabs";
import { studentsTabs } from "../../components/NavTabs/tabs";
import { studentColumns } from "../../store/student.data";
import Table from "../../components/Table";
import useTableFilters from "../../components/Table/useTableFilters";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";

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
  const {
    pagination,
    pageSize,
    setPagination,
    fetchDataOptions,
    sorting,
    setSorting,
  } = useTableFilters(0, 10);

  const { isLoading, data, error } = trpc.useQuery(
    ["admin.student.getPendingValidatons", fetchDataOptions],
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Loader />;
  if (error instanceof Error) return <span> Error</span>;

  if (Array.isArray(data) && !data.length) {
    return <h1>No pending validation left</h1>;
  }
  return data ? (
    <Table
      columns={studentColumns}
      data={data.results}
      setPagination={setPagination}
      pagination={pagination}
      pageCount={Math.ceil(data.count / pageSize)}
      setSorting={setSorting}
      sorting={sorting}
    />
  ) : null;
};
