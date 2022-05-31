import SelectionRowTable from ".";

export default {
  title: "SelectionRowTable",
  component: SelectionRowTable,
};
export const Default = () => (
  <SelectionRowTable columns={columns} data={data} />
);

const columns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
    ],
  },
  {
    Header: "Info",
    columns: [
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Visits",
        accessor: "visits",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
      },
    ],
  },
];

const data = [
  {
    firstName: "child-7xmde",
    lastName: "bun-lxccm",
    age: 17,
    visits: 34,
    progress: 56,
    status: "relationship",
  },
  {
    firstName: "blood-z5inp",
    lastName: "bit-xuz7x",
    age: 29,
    visits: 31,
    progress: 98,
    status: "relationship",
  },
  {
    firstName: "grain-prl1f",
    lastName: "virus-a9k4v",
    age: 24,
    visits: 71,
    progress: 53,
    status: "complicated",
  },
  {
    firstName: "goose-hgb6l",
    lastName: "shame-glzej",
    age: 1,
    visits: 44,
    progress: 25,
    status: "complicated",
  },
  {
    firstName: "move-w34xd",
    lastName: "planes-4w53h",
    age: 6,
    visits: 23,
    progress: 6,
    status: "complicated",
  },
  {
    firstName: "beer-tu2nn",
    lastName: "expression-s4nza",
    age: 20,
    visits: 5,
    progress: 55,
    status: "relationship",
  },
  {
    firstName: "measurement-bymvg",
    lastName: "calculator-6xxmp",
    age: 10,
    visits: 2,
    progress: 93,
    status: "single",
  },
  {
    firstName: "lake-he4pf",
    lastName: "club-z6j4j",
    age: 7,
    visits: 39,
    progress: 16,
    status: "single",
  },
  {
    firstName: "inspection-8hx9u",
    lastName: "studio-kk6qi",
    age: 20,
    visits: 64,
    progress: 79,
    status: "relationship",
  },
  {
    firstName: "summer-ujj5s",
    lastName: "friction-cpzbx",
    age: 20,
    visits: 46,
    progress: 26,
    status: "complicated",
  },
];
