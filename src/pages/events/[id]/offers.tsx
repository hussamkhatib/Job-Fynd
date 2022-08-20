import { useRouter } from "next/router";
import Table from "../../../components/Table";
import { adminEventColumns } from "../../../store/events.data";
import { studentOfferColumns } from "../../../store/offer.data";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import NavTabs from "../../../components/NavTabs";
import { adminEventTabs } from "../../../components/NavTabs/tabs";
import { Fragment } from "react";
import { trpc } from "../../../utils/trpc";
import Loader from "../../../components/ui/Loader";
import Alert from "../../../components/ui/Alert";

const Offers = () => {
  const { data: session } = useSession();
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

  const eventDetails = trpc.useQuery(
    [
      "events.getById",
      {
        id,
      },
    ],
    {
      select: (data) => [data],
    }
  );

  const offers = trpc.useQuery(["events.id.offers", { id }]);

  return (
    <Fragment>
      <h2 className="px-2 pb-2 text-lg">Event Details</h2>
      {eventDetails.isLoading ? (
        <Loader />
      ) : eventDetails.error ? (
        <Alert>{eventDetails.error.message}</Alert>
      ) : (
        <Table columns={adminEventColumns} data={eventDetails.data || []} />
      )}
      <div className="px-2 py-2">
        {offers.isLoading ? (
          <Loader />
        ) : offers.error ? (
          <Alert>{offers.error.message}</Alert>
        ) : (
          <Fragment>
            <h2 className="textlg">Offers</h2>
            {offers.data.length ? (
              <Table columns={studentOfferColumns} data={offers.data} />
            ) : (
              <span>No one has been placed in this event yet.</span>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
