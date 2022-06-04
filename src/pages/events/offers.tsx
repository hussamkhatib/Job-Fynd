import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { offerCols } from "../../store/offer.data";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchStudentOffers = async (usn: string) => {
  const { data } = await axios.get(`/api/student/${usn}/offers`);
  return data;
};

const Offers = () => {
  const { data: session }: { data: any } = useSession();
  const { usn } = session.user;

  const { isLoading, data, error } = useQuery(["companies", usn], () =>
    fetchStudentOffers(usn)
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  if (session?.user.role === Role.admin) return null;
  if (Array.isArray(data) && !data.length)
    return <span>You have no offers yet.</span>;
  return (
    <div>
      <NavTabs tabs={studentEventTabs} />
      <Table columns={offerCols} rowsCount={2} data={data} />
    </div>
  );
};

export default Offers;
