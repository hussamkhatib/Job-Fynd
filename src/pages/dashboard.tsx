import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import BranchWiseOffers from "../components/BranchWiseOffers";

const Dashboard = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.student) return null;
  return (
    <div>
      <BranchWiseOffers />
    </div>
  );
};

export default Dashboard;
