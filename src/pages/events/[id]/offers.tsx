import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Table from "../../../components/Table";
import { adminEventCols } from "../../../store/events.data";
import { studentOfferCols } from "../../../store/offer.data";
import user, { UserRole } from "../../../userContext";

const Offers = () => {
  const router = useRouter();
  const userRole = useContext(user);
  const [data, setData] = useState<any>([]);
  const [eventData, setEventData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = router.query as any;

  useEffect(() => {
    if (id) {
      (async () => {
        const response = await fetch(`/api/event/${id}`);
        const json = await response.json();
        setEventData([json]);
      })();
      (async () => {
        const response = await fetch(`/api/event/${id}/offer`);
        const json = await response.json();
        setData(json);
        setIsLoaded(true);
      })();
    }
  }, [id]);

  if (!isLoaded) return <div>Loading ...</div>;
  if (userRole === UserRole.student) return null;

  return (
    <div>
      <h2 className="px-2 py-4 text-xl">Event Details</h2>
      <Table columns={adminEventCols} rowsCount={1} data={eventData} />
      <h2 className="px-2 py-4 text-xl">Offers</h2>
      <Table columns={studentOfferCols} rowsCount={10} data={data} />
    </div>
  );
};

export default Offers;
