import Table from ".";
import { studentCols } from "../pages/Profile/data";
import { students } from "../../../prisma/data";
import LoadingTable from "./LoadingTable";

export default {
  title: "Table",
  component: Table,
};

export const StudentTable = () => (
  <Table columns={studentCols} data={students} rowsCount={1} />
);

export const StudentTableLoading = () => (
  <LoadingTable columns={studentCols} rows={1} />
);
