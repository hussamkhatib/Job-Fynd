import { createTable } from "@tanstack/react-table";
import Link from "next/link";
import { AdminEvent, Event, StudentApplicationEvent } from "../types/event";

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
];

export const adminEventTable = createTable().setRowType<AdminEvent>();

export const adminEventColumns = [
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

export const studentApplicationEventTable =
  createTable().setRowType<StudentApplicationEvent>();

export const studentApplicationEventColumns = [
  ...eventColumns,
  studentApplicationEventTable.createDataColumn("result", {
    header: "Result",
  }),
];
