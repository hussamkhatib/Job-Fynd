import Link from "next/link";
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
    Cell: ({
      cell: {
        value,
        row: {
          values: { id },
        },
      },
    }: {
      cell: any;
    }) => {
      return (
        <Link href={`/events/${id}`}>
          <a className="underline" target="_blank">
            {value}
          </a>
        </Link>
      );
    },
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
    Cell: ({
      cell: {
        value,
        row: {
          values: { id },
        },
      },
    }: {
      cell: any;
    }) => {
      return (
        <Link href={`/events/${id}/applied`}>
          <a target="_blank">{value}</a>
        </Link>
      );
    },
  },
  {
    Header: "Offers",
    accessor: "offers",
    Cell: ({
      cell: {
        value,
        row: {
          values: { id },
        },
      },
    }: {
      cell: any;
    }) => {
      return (
        <Link href={`/events/${id}/offers`}>
          <a target="_blank">{value}</a>
        </Link>
      );
    },
  },
];
