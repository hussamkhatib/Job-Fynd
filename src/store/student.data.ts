import { students } from "../../prisma/data";
import { StudentCol } from "../types/student";

export const studentCols: StudentCol[] = [
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
