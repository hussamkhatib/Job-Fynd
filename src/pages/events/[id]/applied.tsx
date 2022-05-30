import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Table from "../../../components/Table";
import { studentCols } from "../../../store/student.data";
import { adminEventCols } from "../../../store/events.data";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
const EventAppliedPage: FC = () => {
  const { data: session }: { data: any } = useSession();
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
      const response = await fetch(`/api/event/${id}/applications`);
      const json = await response.json();
      setData(json);
      setIsLoaded(true);
    })();
  }, [id]);

  if (!isLoaded) return <div>loading...</div>;
  if (session?.user.role === Role.admin)
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
