import { useRouter } from "next/router";
import Table from "../../../components/Table";
import { adminEventCols } from "../../../store/events.data";
import { studentOfferCols } from "../../../store/offer.data";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import { useQuery } from "react-query";
import axios from "axios";
import NavTabs from "../../../components/NavTabs";
import { adminEventTabs } from "../../../components/NavTabs/tabs";
import { Fragment } from "react";

const fetchEventDetails = async (id: string) => {
  const { data } = await axios.get(`/api/event/${id}`);
  return data;
};

const fetchOffers = async (id: string) => {
  const { data } = await axios.get(`/api/event/${id}/offers`);
  return data;
};

const Offers = () => {
  const { data: session }: { data: any } = useSession();
  const router = useRouter();

  const { id } = router.query as any;

  const eventDetails = useQuery(
    ["eventDetails", id],
    () => fetchEventDetails(id),
    {
      select: (data) => [data],
    }
  );

  const offers = useQuery(["eventOffers", id], () => fetchOffers(id));

  const isLoading = eventDetails.isLoading || offers.isLoading;
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (eventDetails.error instanceof Error) {
    <span>Error: {eventDetails.error.message}</span>;
  }
  if (offers.error instanceof Error) {
    <span>Error: {offers.error.message}</span>;
  }

  if (session?.user.role === Role.student) return null;

  return (
    <div>
      <NavTabs tabs={adminEventTabs} />
      <h2 className="px-2 pb-2 text-lg">Event Details</h2>
      {eventDetails.data && (
        <Table columns={adminEventCols} data={eventDetails.data} />
      )}
      <div className="px-2 py-2">
        {Array.isArray(offers.data) && offers.data?.length ? (
          <Fragment>
            <h2 className="textlg">Offers</h2>
            <Table columns={studentOfferCols} data={offers.data} />
          </Fragment>
        ) : (
          <span>No one has been placed in this event yet.</span>
        )}
      </div>
    </div>
  );
};

export default Offers;
