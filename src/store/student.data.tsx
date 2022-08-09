import { Board, Branch, Gender, ScoreType } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import Button from "../components/ui/Button";
import { Student } from "../types/student";

const columnHelper = createColumnHelper<Student>();

export const studentColumns = [
  columnHelper.accessor("id", {}),
  columnHelper.accessor("name", {
    header: "Name",
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
  }),
  columnHelper.accessor("validated", {
    header: "Validated",
  }),
];

export const branches = Object.values(Branch);
export const genders = Object.values(Gender);
export const boards = Object.values(Board);
export const scoreTypes = Object.values(ScoreType);
