import { Board, Branch, Gender, ScoreType } from "@prisma/client";
import { createTable } from "@tanstack/react-table";
import Button from "../components/ui/Button";
import { Student } from "../types/student";

export const studentTable = createTable().setRowType<Student>();
export const studentColumns = [
  studentTable.createDataColumn("id", {
    header: "id",
  }),
  studentTable.createDataColumn("name", {
    header: "Name",
  }),
  studentTable.createDataColumn("usn", {
    header: "USN",
    cell: ({ getValue }) => {
      const value = getValue();
      return value ? (
        <Button
          className="underline"
          color="minimal"
          size="sm"
          href={`/students/${getValue()}`}
        >
          {getValue()}
        </Button>
      ) : null;
    },
  }),
  studentTable.createDataColumn("email", {
    header: "Email",
  }),
  studentTable.createDataColumn("branch", {
    header: "Branch",
  }),
  studentTable.createDataColumn("validated", {
    header: "Validated",
  }),
];

export const branches = Object.values(Branch);
export const genders = Object.values(Gender);
export const boards = Object.values(Board);
export const scoreTypes = Object.values(ScoreType);
