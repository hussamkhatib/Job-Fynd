import Link from "next/link";
import { AdminEvent, Event, StudentApplicationEvent } from "../types/event";
import { createColumnHelper } from "@tanstack/react-table";
import Cell from "../components/Table/Cell";
import classNames from "classnames";
import { EventResult, Status } from "@prisma/client";
import { branchColors } from "./student.data";
const eventColumnHelper = createColumnHelper<Event>();

interface BranchesAllowed {
  name: string;
  eventId: string;
}

export const eventColumns = [
  eventColumnHelper.accessor("id", {}),
  // eventColumnHelper.accessor("company.name", {
  //   header: "Company",
  // }),
  eventColumnHelper.accessor("title", {
    header: "Title",
    cell: ({ getValue, row: { original } }) => {
      return (
        <Link href={`/events/${original?.id}`}>
          <a className="underline" rel="noreferrer" target="_blank">
            {getValue()}
          </a>
        </Link>
      );
    },
  }),
  eventColumnHelper.accessor("ctc", {
    size: 75,
    header: "CTC",
    cell: (info) => {
      const ctc = info.getValue();
      return <span>{ctc} LPA</span>;
    },
  }),
  eventColumnHelper.accessor("company.sector", {
    header: "Sector",
  }),
  eventColumnHelper.accessor("type", {
    header: "Type",
  }),
  eventColumnHelper.accessor("branchesAllowed", {
    header: "Branched Allowed",
    cell: (branchesAllowed) => {
      const branches = branchesAllowed.getValue() as any as BranchesAllowed[];
      return (
        <>
          {branches.map((branch) => (
            <Cell key={branch.name} bg={branchColors.get(branch?.name)}>
              {branch?.name}
            </Cell>
          ))}
        </>
      );
    },
  }),
  eventColumnHelper.accessor("status", {
    header: "Status",
    size: 75,
    cell: (info) => {
      const status = info.getValue();
      return (
        <span
          className={classNames(
            status === Status.Open
              ? "bg-emerald-200 text-emerald-600"
              : "bg-rose-200 text-rose-600",
            "px-2 py-1 rounded"
          )}
        >
          {status}
        </span>
      );
    },
  }),
];

const adminEventColumnHelper = createColumnHelper<AdminEvent>();

export const adminEventColumns = [
  ...eventColumns,
  adminEventColumnHelper.accessor("_count.students", {
    header: "Applied",
    size: 75,
    cell: ({ getValue, row: { original } }) => {
      return (
        <Link href={`/events/${original?.id}/applied`}>
          <a className="underline" rel="noreferrer" target="_blank">
            {getValue()}
          </a>
        </Link>
      );
    },
  }),
  adminEventColumnHelper.accessor("_count.offers", {
    header: "Offers",
    size: 75,
    cell: ({ getValue, row: { original } }) => {
      return (
        <Link href={`/events/${original?.id}/offers`}>
          <a className="underline" rel="noreferrer" target="_blank">
            {getValue()}
          </a>
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
        <Link href={`/events/${original?.event?.id}`}>
          <a className="underline" rel="noreferrer" target="_blank">
            {getValue()}
          </a>
        </Link>
      );
    },
  }),
  studentApplicationEventColumnHelper.accessor("event.ctc", {
    header: "CTC",
    cell: (info) => {
      const ctc = info.getValue();
      return <span>{ctc} LPA</span>;
    },
  }),
  studentApplicationEventColumnHelper.accessor("event.company.sector", {
    header: "Sector",
  }),
  studentApplicationEventColumnHelper.accessor("event.type", {
    header: "Type",
  }),
  studentApplicationEventColumnHelper.accessor("event.status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      return (
        <span
          className={classNames(
            status === Status.Open
              ? "bg-emerald-200 text-emerald-600"
              : "bg-rose-200 text-rose-600",
            "px-2 py-1 rounded"
          )}
        >
          {status}
        </span>
      );
    },
  }),
  studentApplicationEventColumnHelper.accessor("result", {
    header: "Result",
    cell: (info) => {
      const validated = info.getValue();
      return (
        <span
          className={classNames(
            validated === EventResult.placed
              ? "bg-emerald-200 text-emerald-600"
              : EventResult.pending
              ? "bg-slate-200 text-slate-600"
              : "bg-rose-200 text-rose-600",
            "px-2 py-1 rounded"
          )}
        >
          {validated}
        </span>
      );
    },
  }),
];
