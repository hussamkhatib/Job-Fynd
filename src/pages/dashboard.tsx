import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { lazy, Suspense } from "react";
import Loader from "../components/ui/Loader";
// import BranchWiseOffers from "../components/BranchWiseOffers";

const Dashboard = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.student) return null;
  const BranchWiseOffers = lazy(() => import("../components/BranchWiseOffers"));
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <BranchWiseOffers />
      </Suspense>
    </div>
  );
};

export default Dashboard;
