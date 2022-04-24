import Table from ".";

export default {
  title: "Table",
  component: Table,
};

const data = [
  {
    col1: "Happiest Minds",
    col2: "5.4 LPA",
    col3: "IT",
  },
  {
    col1: "Bygus",
    col2: "10 LPA",
    col3: "Sales",
  },
  {
    col1: "Goldman sachs",
    col2: "6 LPA",
    col3: "IT",
  },
];

const columns = [
  {
    Header: "Company",
    accessor: "col1", // accessor is the "key" in the data
  },
  {
    Header: "CTC",
    accessor: "col2",
  },
  {
    Header: "Sector",
    accessor: "col3",
  },
];

export const Primary = () => <Table columns={columns} data={data} />;
