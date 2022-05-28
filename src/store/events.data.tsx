import CellList from "../components/Table/Cell/CellList";

export const eventCols = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Company",
    accessor: "company",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "CTC",
    accessor: "ctc",
  },
  {
    Header: "Sector",
    accessor: "sector",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Branches Allowed",
    accessor: "branches_allowed",
    Cell: ({ cell: { value } }: { cell: any }) => <CellList values={value} />,
  },
];
export const adminEventCols = [
  ...eventCols,
  {
    Header: "Applied",
    accessor: "applied",
  },
  {
    Header: "Offers",
    accessor: "offers",
  },
];
