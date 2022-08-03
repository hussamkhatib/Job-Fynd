import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { studentColumns } from "../../store/student.data";
import { studentsTabs } from "../../components/NavTabs/tabs";
import usePagination from "../../hooks/usePagination";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";

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

  const { isLoading, data, error } = trpc.useQuery(
    ["students.get", fetchDataOptions],
    {
      select: (data) => {
        const results = data.results.map((data) => data.studentRecord);
        return {
          count: data.count,
          results,
        };
      },
    }
  );

  if (isLoading) return <Loader />
  if (error instanceof Error)
    return (
      // TODO:3a8f839d-357b-441b-a4fc-6b1d83c31f30
      <span>Error</span>
    );
  return data ? (
    <Table
      columns={studentColumns}
      data={data.results}
      setPagination={setPagination}
      state={{ pagination, columnVisibility: { id: false } }}
      pageCount={Math.ceil(data.count / pageSize)}
      manualPagination
    />
  ) : null;
};
