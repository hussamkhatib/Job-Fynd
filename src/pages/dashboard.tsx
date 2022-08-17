import { Role } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { lazy, Suspense } from "react";
import Loader from "../components/ui/Loader";

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  const AdminDashboard = lazy(() => import("../components/AdminDashboard"));
  const StudentDashboard = lazy(() => import("../components/StudentDashboard"));

  return (
    <Suspense fallback={<Loader />}>
      {session?.user.role === Role.admin ? (
        <AdminDashboard />
      ) : (
        <StudentDashboard />
      )}
    </Suspense>
  );
};

export default Dashboard;
