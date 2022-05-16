import Table from ".";
import { studentCols } from "../../pages/profile/data";
import { students } from "../../../prisma/data";
import LoadingTable from "./LoadingTable";
import CellList from "./Cell/CellList";

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

export const List = () => <CellList arr={["CSE", "ISE"]} />;
