import Table from ".";
import { studentCols } from "../../store/student.data";
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

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "likes",
    accessor: "likes",
    Cell: ({ cell: { value } }: { cell: any }) => <CellList values={value} />,
  },
];

const data = [
  {
    name: "hussam",
    likes: ["hussam@gmail.com", "football"],
  },
];

export const Test = () => <Table columns={columns} data={data} rowsCount={5} />;
