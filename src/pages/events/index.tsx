import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import {
  adminEventTabs,
  studentEventTabs,
} from "../../components/NavTabs/tabs";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { adminEventColumns, eventColumns } from "../../store/events.data";
import usePagination from "../../hooks/usePagination";
import AxiosErrorMsg from "../../components/AxiosErrorMsg";

const Events = () => {
  const { data: session } = useSession();
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
  const { data: session } = useSession();
  const columns =
    session?.user.role === Role.student ? eventColumns : adminEventColumns;

  const { pagination, pageSize, setPagination, fetchDataOptions } =
    usePagination(0, 10);

  const { isLoading, data, error } = useQuery(
    ["events", fetchDataOptions],
    () => fetchEvents(fetchDataOptions)
  );

  if (isLoading) return <span>Loading...</span>;
  if (error instanceof Error)
    return <AxiosErrorMsg error={error as AxiosError} />;

  return (
    <Table
      columns={columns}
      data={data.results}
      setPagination={setPagination}
      state={{ pagination, columnVisibility: { id: false } }}
      pageCount={Math.ceil(data.count / pageSize)}
      manualPagination
    />
  );
};

const fetchEvents = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  const { data } = await axios.get(
    `api/event?offset=${pageIndex}&limit=${pageSize}`
  );
  return data;
};
