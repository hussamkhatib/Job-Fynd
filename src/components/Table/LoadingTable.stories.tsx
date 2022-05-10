import LoadingTable from "./LoadingTable";
import { studentCols } from "../pages/Profile/data";

export default {
  title: "LoadingTable",
  component: LoadingTable,
};

export const Default = () => <LoadingTable columns={studentCols} rows={4} />;
