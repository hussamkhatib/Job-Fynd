import Table from ".";
import { studentCols } from "../pages/Profile/data";
import { students } from "../../../prisma/data";

export default {
  title: "Table",
  component: Table,
};

export const StudentTable = () => (
  <Table columns={studentCols} data={students} />
);
