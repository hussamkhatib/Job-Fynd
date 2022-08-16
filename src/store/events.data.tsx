import Link from "next/link";
import { AdminEvent, Event, StudentApplicationEvent } from "../types/event";
import { createColumnHelper } from "@tanstack/react-table";
import Cell from "../components/Table/Cell";

const eventColumnHelper = createColumnHelper<Event>();

interface Branches_allowed {
  name: string;
  eventId: string;
}

export const eventColumns = [
  eventColumnHelper.accessor("id", {}),
  eventColumnHelper.accessor("company.name", {
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
  eventColumnHelper.accessor("company.sector", {
    header: "Sector",
  }),
  eventColumnHelper.accessor("type", {
    header: "Type",
  }),
  eventColumnHelper.accessor("branches_allowed", {
    header: "Branched Allowed",
    cell: (branches_allowed) => {
      const branches = branches_allowed.getValue() as any as Branches_allowed[];
      return (
        <>
          {branches.map((branch) => (
            <span key={branch.name} className="m-1">
              <Cell>{branch?.name}</Cell>
            </span>
          ))}
        </>
      );
    },
  }),
  eventColumnHelper.accessor("status", {
    header: "Status",
  }),
];

const adminEventColumnHelper = createColumnHelper<AdminEvent>();

export const adminEventColumns = [
  ...eventColumns,
  adminEventColumnHelper.accessor("_count.students", {
    header: "Applied",
    cell: ({ getValue, row: { original } }) => {
      return (
        <Link href={`/events/${original?.id}/applied`}>
          <a target="_blank">{getValue()}</a>
        </Link>
      );
    },
  }),
  adminEventColumnHelper.accessor("_count.offers", {
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
  studentApplicationEventColumnHelper.accessor("id", {}),
  studentApplicationEventColumnHelper.accessor("event.company.name", {
    header: "Company",
  }),
  studentApplicationEventColumnHelper.accessor("event.title", {
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
  studentApplicationEventColumnHelper.accessor("event.ctc", {
    header: "CTC",
  }),
  studentApplicationEventColumnHelper.accessor("event.company.sector", {
    header: "Sector",
  }),
  studentApplicationEventColumnHelper.accessor("event.type", {
    header: "Type",
  }),
  studentApplicationEventColumnHelper.accessor("event.status", {
    header: "Status",
  }),
  studentApplicationEventColumnHelper.accessor("result", {
    header: "Result",
  }),
];
