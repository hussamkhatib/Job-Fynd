import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { offerColumns } from "../../store/offer.data";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";
import Alert from "../../components/ui/Alert";

const Offers = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.admin) return null;

  return (
    <div>
      <NavTabs tabs={studentEventTabs} />
      <StudentOffers />
    </div>
  );
};

export default Offers;

const StudentOffers = () => {
  const { isLoading, data, error } = trpc.useQuery(["users.me.offers"]);

  if (isLoading) return <Loader />;
  if (error) return <Alert>{error.message}</Alert>;

  if (Array.isArray(data) && !data.length)
    return <span>You have no offers yet.</span>;
  return data ? <Table columns={offerColumns} data={data} /> : null;
};
