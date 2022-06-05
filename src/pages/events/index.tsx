import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { adminEventCols, eventCols } from "../../store/events.data";
import {
  adminEventTabs,
  studentEventTabs,
} from "../../components/NavTabs/tabs";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import { useQuery } from "react-query";
import axios from "axios";

const fetchCompanies = async () => {
  const { data } = await axios.get("api/event");
  return data;
};

const Events = () => {
  const { data: session }: { data: any } = useSession();
  const tabs =
    session?.user.role === Role.student ? studentEventTabs : adminEventTabs;

  return (
    <div>
      <NavTabs tabs={tabs} />
      <EventsTable />
    </div>
  );
};

export default Events;

const EventsTable = () => {
  const columns = Role.student ? eventCols : adminEventCols;
  const { isLoading, data, error } = useQuery("companies", fetchCompanies);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  return <Table columns={columns} data={data} />;
};
