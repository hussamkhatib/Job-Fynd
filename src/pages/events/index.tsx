import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { adminEventCols, eventCols } from "../../store/events.data";
import {
  adminEventTabs,
  studentEventTabs,
} from "../../components/NavTabs/tabs";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";

const Events = () => {
  const { data: session }: { data: any } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const tabs =
    session?.user.role === Role.student ? studentEventTabs : adminEventTabs;
  const columns = Role.student ? eventCols : adminEventCols;
  useEffect(() => {
    fetch("/api/event")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoaded(true);
      });
  }, []);

  return (
    <div>
      <NavTabs tabs={tabs} />
      <Table
        columns={columns}
        data={data}
        isLoading={!isLoaded}
        rowsCount={10}
      />
    </div>
  );
};

export default Events;
