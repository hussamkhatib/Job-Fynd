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
    Header: "Branches Allowed",
    accessor: "branches_allowed",
    Cell: ({ cell: { value } }: { cell: any }) => <CellList values={value} />,
  },
];
export const adminEventCols = [
  ...eventCols,
  {
    Header: "Offers",
    accessor: "offers",
  },
];
export const allEvents = {
  data: [
    {
      company: "Happiest Minds",
      ctc: "5.4 LPA",
      sector: "IT",
    },
    {
      company: "Bygus",
      ctc: "10 LPA",
      sector: "Sales",
    },
    {
      company: "Goldman sachs",
      ctc: "6 LPA",
      sector: "IT",
    },
  ],
  columns: eventCols,
};
