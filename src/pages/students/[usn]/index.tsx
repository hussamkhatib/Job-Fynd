import { Role } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import StudentProfile from "../../../components/StudentProfile";

const StudentPage = () => {
  const router = useRouter();
  const { data: session }: { data: any } = useSession();
  const { usn } = router.query as any;

  const { isLoading, data, error } = useQuery(
    ["studentProfileByUsn", `${usn}?profile=full`],
    () => fetchStudentProfileByUsn(`${usn}?profile=full`)
  );

  if (session?.user.role === Role.student)
    return <p>You are not allowed to view this page</p>;
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  return <StudentProfile details={data} />;
};

export default StudentPage;

const fetchStudentProfileByUsn = async (query: string) => {
  const { data } = await axios.get(`/api/student/${query}`);
  return data;
};
