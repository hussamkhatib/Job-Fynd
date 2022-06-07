import { createTable } from "@tanstack/react-table";
import Link from "next/link";
import CellList from "../components/Table/Cell/CellList";
import { AdminEvent, Event } from "../types/event";

export const eventTable = createTable().setRowType<Event>();

export const eventColumns = [
  eventTable.createDataColumn("id", {
    header: "id",
  }),
  eventTable.createDataColumn("company", {
    header: "Company",
  }),
  eventTable.createDataColumn("title", {
    header: "Title",
    cell: ({ getValue, row: { original } }) => {
      return (
        <Link href={`/events/${original?.id}`}>
          <a className="underline" target="_blank">
            {getValue()}
          </a>
        </Link>
      );
    },
  }),
  eventTable.createDataColumn("ctc", {
    header: "CTC",
  }),
  eventTable.createDataColumn("sector", {
    header: "Sector",
  }),
  eventTable.createDataColumn("type", {
    header: "Type",
  }),
  eventTable.createDataColumn("status", {
    header: "Status",
  }),
  eventTable.createDataColumn("branches_allowed", {
    header: "Branches Allowed",
    cell: (info) => {
      const values = info.getValue();
      return <CellList values={values} />;
    },
  }),
];

export const adminEventTable = createTable().setRowType<AdminEvent>();

export const adminColumns = [
  ...eventColumns,
  adminEventTable.createDataColumn("applied", {
    header: "Applied",
    cell: ({ getValue, row: { original } }) => {
      return (
        <Link href={`/events/${original?.id}/applied`}>
          <a target="_blank">{getValue()}</a>
        </Link>
      );
    },
  }),
  adminEventTable.createDataColumn("offers", {
    header: "Offers",
    cell: ({ getValue, row: { original } }) => {
      return (
        <Link href={`/events/${original?.id}/applied`}>
          <a target="_blank">{getValue()}</a>
        </Link>
      );
    },
  }),
];
