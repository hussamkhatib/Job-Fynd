import Table from ".";
import { studentCols } from "../../store/student.data";
import LoadingTable from "./LoadingTable";
import CellList from "./Cell/CellList";

export default {
  title: "Table",
  component: Table,
};
const users = [
  {
    id: "cl3s5wva1000109m8gf2k3pmv",
    createdAt: "2022-05-30T15:22:17.737Z",
    updatedAt: "2022-05-30T15:22:17.738Z",
    role: "student",
    email: "person1@gmail.com",
    name: "Person 1",
    image: "fakerImg",
    emailVerified: false,
    phone: "+9108410511",
    usn: "4VV18CS079",
    branch: "CSE",
    resume:
      "https://cdn.pixabay.com/photo/2017/10/31/00/23/portfolio-2903909_960_720.png",
    opted: "yes",
    validated: "notvalidated",
  },
  {
    id: "cl3s5xkdl000209m81deicu4i",
    createdAt: "2022-05-30T15:22:17.737Z",
    updatedAt: "2022-05-30T15:22:17.738Z",
    role: "student",
    email: "perosn2@gmail.com",
    name: "Person 2",
    image: "fakerImg",
    emailVerified: false,
    phone: "+9108410512",
    usn: "4VV18CS080",
    branch: "CSE",
    resume:
      "https://cdn.pixabay.com/photo/2017/05/09/00/15/resume-2296951__340.png",
    opted: "yes",
    validated: "notvalidated",
  },
  {
    id: "cl3s5xvql000309m8g9gq5anv",
    createdAt: "2022-05-30T15:22:17.737Z",
    updatedAt: "2022-05-30T15:22:17.738Z",
    role: "student",
    email: "person3@gmail.com",
    name: "person3",
    image: "fakerImg",
    emailVerified: false,
    phone: "+9108410513",
    usn: "4VV18CS081",
    branch: "CSE",
    resume:
      "https://cdn.pixabay.com/photo/2018/08/13/22/53/resume-3604240__340.jpg",
    opted: "yes",
    validated: "notvalidated",
  },
  {
    id: "cl3s5y02f000409m8f34dfrq2",
    createdAt: "2022-05-30T15:22:17.737Z",
    updatedAt: "2022-05-30T15:22:17.738Z",
    role: "student",
    email: "person4@gmail.com",
    name: "person4",
    image: "fakerImg",
    emailVerified: false,
    phone: "+9108410514",
    usn: "4VV18CS082",
    branch: "CSE",
    resume:
      "https://cdn.pixabay.com/photo/2016/11/05/11/15/resume-1799955__340.png",
    opted: "yes",
    validated: "notvalidated",
  },
  {
    id: "cl3s5y9kj000509m81n6kfd56",
    createdAt: "2022-05-30T15:22:17.738Z",
    updatedAt: "2022-05-30T15:22:17.738Z",
    role: "student",
    email: "person5@gmail.com",
    name: "person5",
    image: "fakerImg",
    emailVerified: false,
    phone: "+8108411512",
    usn: "4VV18CS083",
    branch: "CSE",
    resume:
      "https://cdn.pixabay.com/photo/2016/11/05/11/15/resume-1799954__340.png",
    opted: "yes",
    validated: "notvalidated",
  },
  {
    id: "cl3s5yga8000609m83xqr9fj4",
    createdAt: "2022-05-30T15:22:17.738Z",
    updatedAt: "2022-05-30T15:22:17.738Z",
    role: "student",
    email: "person6@gmail.com",
    name: "person6",
    image: "fakerImg",
    emailVerified: false,
    phone: "+810841152121",
    usn: "4VV18CS084",
    branch: "CSE",
    resume:
      "https://cdn.pixabay.com/photo/2016/11/05/11/15/resume-1799953__340.png",
    opted: "yes",
    validated: "notvalidated",
  },
];
export const StudentTable = () => (
  <Table columns={studentCols} data={users} rowsCount={1} />
);

export const StudentTableLoading = () => (
  <LoadingTable columns={studentCols} rows={1} />
);

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "likes",
    accessor: "likes",
    Cell: ({ cell: { value } }: { cell: any }) => <CellList values={value} />,
  },
];

const data = [
  {
    name: "hussam",
    likes: ["hussam@gmail.com", "football"],
  },
];

export const Test = () => <Table columns={columns} data={data} rowsCount={5} />;
