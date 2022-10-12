import NavTabs from "../../components/NavTabs";
import { studentsTabs } from "../../components/NavTabs/tabs";
import { studentColumns } from "../../store/student.data";
import Table from "../../components/Table";
import useTableFilters from "../../components/Table/useTableFilters";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";
import Alert from "../../components/ui/Alert";
import Error from "next/error";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";

const ValidateStudents = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.student) return <Error statusCode={403} />;

  return (
    <>
      <NavTabs tabs={studentsTabs} />
      <ValidateStudentTable />
    </>
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
  if (error) return <Alert>{error.message}</Alert>;

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
