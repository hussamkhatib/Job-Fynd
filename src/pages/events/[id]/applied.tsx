import React, { FC, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import user, { UserRole } from "../../../userContext";
import Table from "../../../components/Table";
import { studentCols } from "../../../store/student.data";
import { adminEventCols } from "../../../store/events.data";

const EventAppliedPage: FC = () => {
  const userRole = useContext(user);
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [eventData, setEventData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = router.query as any;

  useEffect(() => {
    id &&
      (async () => {
        const response = await fetch(`/api/event/${id}`);
        const json = await response.json();
        setEventData([json]);
      })();
    (async () => {
      const response = await fetch(`/api/event/${id}/applied`);
      const json = await response.json();
      setData(json);
      setIsLoaded(true);
    })();
  }, [id]);

  if (!isLoaded) return <div>loading...</div>;
  if (userRole === UserRole.admin)
    return (
      <div>
        <h2 className="px-2 py-4 text-xl"> Event Details</h2>
        <Table columns={adminEventCols} rowsCount={1} data={eventData} />
        <h2 className="px-2 py-4 text-xl">Applied Students</h2>
        <Table columns={studentCols} rowsCount={10} data={data} />
      </div>
    );
  return null;
};

export default EventAppliedPage;
