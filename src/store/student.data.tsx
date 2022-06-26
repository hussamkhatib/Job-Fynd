import { createTable } from "@tanstack/react-table";
import Link from "next/link";
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
      return (
        <Link href={`/students/${getValue()}`}>
          <a className="underline" target="_blank">
            {getValue()}
          </a>
        </Link>
      );
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

export const branches = ["CSE", "ISE", "EEE", "EC"];
