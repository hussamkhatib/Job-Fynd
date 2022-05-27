import Link from "next/link";
import { students } from "../../prisma/data";
import { ExternalLinkIcon } from "@heroicons/react/solid";

export const studentCols = [
  {
    Header: "USN",
    accessor: "usn",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Branch",
    accessor: "branch",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Opted",
    accessor: "opted",
  },
  {
    Header: "Validated",
    accessor: "validated",
  },
  {
    Header: "Resume",
    accessor: "resume",
    Cell: ({ cell: { value } }: { cell: any }) => (
      <Link href={value}>
        <a target="_blank">
          <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
        </a>
      </Link>
    ),
  },
];
export const branches = ["CSE", "ISE", "EEE", "EC"];
export const sampleStudents = {
  data: students.map((student) => ({
    ...student,
    branch: branches[Math.floor(Math.random() * branches.length)],
  })),
  columns: studentCols,
};

export const sampleStudent = {
  data: [
    {
      ...students[0],
      branch: "CSE",
    },
  ],
  columns: studentCols,
};

export default sampleStudents;

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
