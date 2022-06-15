import { ExternalLinkIcon } from "@heroicons/react/solid";
import { createTable } from "@tanstack/react-table";
import Link from "next/link";
import { Student } from "../types/student";

export const studentTable = createTable().setRowType<Student>();
export const studentColumns = [
  studentTable.createDataColumn("id", {
    header: "id",
  }),
  studentTable.createDataColumn("name", {
    header: "name",
  }),
  studentTable.createDataColumn("usn", {
    header: "USN",
  }),
  studentTable.createDataColumn("email", {
    header: "Email",
  }),
  studentTable.createDataColumn("branch", {
    header: "Branch",
  }),
  studentTable.createDataColumn("phone", {
    header: "Phone",
  }),
  studentTable.createDataColumn("opted", {
    header: "Opted",
  }),
  studentTable.createDataColumn("validated", {
    header: "Validated",
  }),
  studentTable.createDataColumn("resume", {
    header: "Resume",
    cell: ({ getValue }) => {
      const value = getValue();
      return value ? (
        <Link href={getValue()}>
          <a target="_blank">
            <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
          </a>
        </Link>
      ) : null;
    },
  }),
];

export const branches = ["CSE", "ISE", "EEE", "EC"];

export const validationMsg: any = {
  notvalidated: {
    status: "error",
    description: "Your Profile is not validated",
  },
  pending: {
    status: "info",
    description: "Your Profile is under validation",
  },
  validated: {
    status: "success",
    description: "Your Profile is validated",
  },
};
