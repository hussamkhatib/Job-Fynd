import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { offerColumns } from "../../store/offer.data";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";

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
  if (error instanceof Error)
    return (
      // TODO:3a8f839d-357b-441b-a4fc-6b1d83c31f30
      <span>Errorr</span>
    );

  if (Array.isArray(data) && !data.length)
    return <span>You have no offers yet.</span>;
  return data ? <Table columns={offerColumns} data={data} /> : null;
};
