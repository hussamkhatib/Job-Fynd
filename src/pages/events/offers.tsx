import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { offerColumns, offerTable } from "../../store/offer.data";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import AxiosErrorMsg from "../../components/AxiosErrorMsg";

const Offers = () => {
  const { data: session }: { data: any } = useSession();
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
  const { isLoading, data, error } = useQuery(
    "studentOffers",
    fetchStudentOffers
  );

  if (isLoading) return <span>Loading...</span>;
  if (error instanceof Error)
    return <AxiosErrorMsg error={error as AxiosError} />;

  if (Array.isArray(data) && !data.length)
    return <span>You have no offers yet.</span>;
  return <Table table={offerTable} columns={offerColumns} data={data} />;
};

const fetchStudentOffers = async () => {
  const { data } = await axios.get(`/api/me/offers`);
  return data;
};

const fetchStudentApplications = async () => {
  const { data } = await axios.get(`/api/me/applications`);
  return data;
};
