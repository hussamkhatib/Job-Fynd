import { Board, Branch, Gender, ScoreType, Validation } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { Student } from "../types/student";

const columnHelper = createColumnHelper<Student>();

export const branches = Object.values(Branch);
export const branchColors = new Map();
branchColors.set(Branch.CSE, "bg-sky-200");
branchColors.set(Branch.ISE, "bg-zinc-200");
branchColors.set(Branch.AIML, "bg-rose-200");
branchColors.set(Branch.CV, "bg-yellow-200");
branchColors.set(Branch.EEE, "bg-violet-200");
branchColors.set(Branch.EC, "bg-pink-200");
branchColors.set(Branch.ME, "bg-orange-200");

export const studentColumns = [
  columnHelper.accessor("id", {}),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => {
      const name = info.getValue();
      return (
        <div>
          <Avatar
            src={info.cell.row.original?.image}
            name={name}
            size={28}
            alt="avatar"
          />
          <span className="ml-2">{name}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("usn", {
    header: "Usn",
    cell: (info) => {
      const value = info.getValue();
      return value ? (
        <Button
          className="underline"
          color="minimal"
          size="sm"
          href={`/students/${value}`}
        >
          {value}
        </Button>
      ) : null;
    },
  }),
  columnHelper.accessor("personalEmail", {
    header: "Email",
  }),
  columnHelper.accessor("branch", {
    header: "Branch",
    cell: (info) => {
      const branch = info.getValue();
      return (
        <span className={classNames(branchColors.get(branch), "p-1 rounded")}>
          {branch}
        </span>
      );
    },
  }),
  columnHelper.accessor("validated", {
    header: "Validated",
    cell: (info) => {
      const validated = info.getValue();
      console.log(validated);
      return (
        <span
          className={classNames(
            validated === Validation.validated
              ? "bg-emerald-200 text-emerald-600"
              : Validation.pending
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

export const genders = Object.values(Gender);
export const boards = Object.values(Board);
export const scoreTypes = Object.values(ScoreType);
