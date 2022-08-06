import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import {
  adminEventTabs,
  studentEventTabs,
} from "../../components/NavTabs/tabs";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import { adminEventColumns, eventColumns } from "../../store/events.data";
import usePagination from "../../hooks/usePagination";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";
import CSVDownload from "../../utils/CSVDownload";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Button from "../../components/ui/Button";
import { Fragment } from "react";

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

  const { isLoading, data, error } = trpc.useQuery([
    "events.get",
    fetchDataOptions,
  ]);
  if (isLoading) return <Loader />;
  if (error instanceof Error)
    return (
      // TODO:3a8f839d-357b-441b-a4fc-6b1d83c31f30
      <span>errror</span>
    );

  return data ? (
    <Fragment>
      {session?.user.role === Role.admin && <DownloadEventsData />}
      <Table
        columns={columns}
        data={data.results}
        setPagination={setPagination}
        state={{ pagination, columnVisibility: { id: false } }}
        pageCount={Math.ceil(data.count / pageSize)}
        manualPagination
      />
    </Fragment>
  ) : null;
};

const DownloadEventsData = () => {
  //TODO : HANDLE ERROR
  const { isLoading, error, refetch } = trpc.useQuery(["admin.event.getAll"], {
    enabled: false,
    onSuccess: (data) => {
      CSVDownload(data, "events", true);
    },
  });

  return (
    <ButtonGroup align="end">
      <Button loading={isLoading} onClick={() => refetch()}>
        Download
      </Button>
    </ButtonGroup>
  );
};
