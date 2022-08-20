import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { studentColumns } from "../../store/student.data";
import { studentsTabs } from "../../components/NavTabs/tabs";
import useTableFilters from "../../components/Table/useTableFilters";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";
import Alert from "../../components/ui/Alert";

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
  const {
    pagination,
    pageSize,
    setPagination,
    fetchDataOptions,
    sorting,
    setSorting,
  } = useTableFilters(0, 10);
  const { isLoading, data, error } = trpc.useQuery(
    ["admin.student.get", fetchDataOptions],
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Loader />;
  if (error) return <Alert> {error.message} </Alert>;
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
