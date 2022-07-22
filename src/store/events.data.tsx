import Link from "next/link";
import { AdminEvent, Event, StudentApplicationEvent } from "../types/event";
import { createColumnHelper } from "@tanstack/react-table";

const eventColumnHelper = createColumnHelper<Event>();

export const eventColumns = [
  eventColumnHelper.accessor("id", {}),
  eventColumnHelper.accessor("company", {
    header: "Company",
  }),
  eventColumnHelper.accessor("title", {
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
  eventColumnHelper.accessor("ctc", {
    header: "CTC",
  }),
  eventColumnHelper.accessor("sector", {
    header: "Sector",
  }),
  eventColumnHelper.accessor("type", {
    header: "Type",
  }),
  eventColumnHelper.accessor("status", {
    header: "Status",
  }),
];

const adminEventColumnHelper = createColumnHelper<AdminEvent>();

export const adminEventColumns = [
  ...eventColumns,
  adminEventColumnHelper.accessor("applied", {
    header: "Applied",
    cell: ({ getValue, row: { original } }) => {
      return (
        <Link href={`/events/${original?.id}/applied`}>
          <a target="_blank">{getValue()}</a>
        </Link>
      );
    },
  }),
  adminEventColumnHelper.accessor("offers", {
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

const studentApplicationEventColumnHelper =
  createColumnHelper<StudentApplicationEvent>();

export const studentApplicationEventColumns = [
  ...eventColumns,
  studentApplicationEventColumnHelper.accessor("result", {
    header: "Result",
  }),
];
