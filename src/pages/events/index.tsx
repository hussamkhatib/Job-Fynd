import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import {
  adminEventTabs,
  studentEventTabs,
} from "../../components/NavTabs/tabs";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import { adminEventColumns, eventColumns } from "../../store/events.data";
import useTableFilters from "../../components/Table/useTableFilters";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";
import CSVDownload from "../../utils/CSVDownload";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Button from "../../components/ui/Button";
import { Fragment } from "react";
import Alert from "../../components/ui/Alert";
import { toast } from "react-toastify";

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

  const {
    pagination,
    pageSize,
    setPagination,
    fetchDataOptions,
    sorting,
    setSorting,
  } = useTableFilters(0, 10);
  const { isLoading, data, error } = trpc.useQuery(
    ["events.get", fetchDataOptions],
    {
      keepPreviousData: true,
    }
  );
  if (isLoading) return <Loader />;
  if (error instanceof Error) return <Alert> {error.message} </Alert>;
  return data && data.count > 0 ? (
    <Fragment>
      {session?.user.role === Role.admin && <DownloadEventsData />}
      <Table
        columns={columns}
        data={data.results}
        setPagination={setPagination}
        pagination={pagination}
        pageCount={Math.ceil(data.count / pageSize)}
        setSorting={setSorting}
        sorting={sorting}
      />
    </Fragment>
  ) : (
    <>There are no events yet</>
  );
};

const DownloadEventsData = () => {
  const { isLoading, refetch } = trpc.useQuery(["admin.event.getAll"], {
    enabled: false,
    onSuccess: (data) => {
      CSVDownload(data, "events", true);
    },
    onError(error) {
      toast.error(error.message);
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
