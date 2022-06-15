import { useRouter } from "next/router";
import Table from "../../../components/Table";
import { adminEventColumns, adminEventTable } from "../../../store/events.data";
import {
  studentOfferColumns,
  studentOfferTable,
} from "../../../store/offer.data";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import { useQuery } from "react-query";
import axios from "axios";
import NavTabs from "../../../components/NavTabs";
import { adminEventTabs } from "../../../components/NavTabs/tabs";
import { Fragment } from "react";

const Offers = () => {
  const { data: session }: { data: any } = useSession();
  if (session?.user.role === Role.student) return null;

  return (
    <div>
      <NavTabs tabs={adminEventTabs} />
      <EventOffersTable />
    </div>
  );
};

export default Offers;

const EventOffersTable = () => {
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
  return (
    <Fragment>
      <h2 className="px-2 pb-2 text-lg">Event Details</h2>
      {eventDetails.data && (
        <Table
          table={adminEventTable}
          columns={adminEventColumns}
          data={eventDetails.data}
        />
      )}
      <div className="px-2 py-2">
        {Array.isArray(offers.data) && offers.data?.length ? (
          <Fragment>
            <h2 className="textlg">Offers</h2>
            <Table
              table={studentOfferTable}
              columns={studentOfferColumns}
              data={offers.data}
            />
          </Fragment>
        ) : (
          <span>No one has been placed in this event yet.</span>
        )}
      </div>
    </Fragment>
  );
};

const fetchEventDetails = async (id: string) => {
  const { data } = await axios.get(`/api/event/${id}`);
  return data;
};

const fetchOffers = async (id: string) => {
  const { data } = await axios.get(`/api/event/${id}/offers`);
  return data;
};
