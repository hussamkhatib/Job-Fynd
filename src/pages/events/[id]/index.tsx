import { FC, Fragment, useState } from "react";
import Button from "../../../components/ui/Button";
import { useRouter } from "next/router";
import Table from "../../../components/Table";
import {
  adminEventColumns,
  adminEventTable,
  eventColumns,
  eventTable,
} from "../../../store/events.data";
import ButtonGroup from "../../../components/ui/Button/ButtonGroup";
import Modal from "../../../components/ui/Modal";
import { Role, Status } from "@prisma/client";
import { useSession } from "next-auth/react";
import Switch from "../../../components/ui/Switch";
import NavTabs from "../../../components/NavTabs";
import {
  adminEventTabs,
  studentEventTabs,
} from "../../../components/NavTabs/tabs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

const EventPage = () => {
  const { data: session }: { data: any } = useSession();
  const tabs =
    session?.user.role === Role.student ? studentEventTabs : adminEventTabs;
  return (
    <div>
      <NavTabs tabs={tabs} />
      {session?.user.role === Role.student && <StudentEventPage />}
      {session?.user.role === Role.admin && <AdminEventPage />}
    </div>
  );
};

export default EventPage;

const AdminEventPage: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id } = router.query as any;

  const { isLoading, data, error }: any = useQuery(
    ["event", id],
    () => fetchEvent(id),
    {
      select: (event) => [event],
    }
  );

  const { mutate } = useMutation(
    (checked: any) =>
      axios.patch(`/api/event/${id}`, {
        status: checked ? Status.Open : Status.Close,
      }),
    {
      onSettled: (data, error) => {
        if (data) {
          const { status } = data.data;
          toast.success(`event is now ${status}`);
          queryClient.invalidateQueries("event", id);
        }
        if (error instanceof Error) toast.error(`Error: ${error.message}`);
      },
    }
  );

  const updateStatus = async (checked: any) => {
    mutate(checked);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  const isEnabledInitially = data[0].status === Status.Open;
  return (
    <div>
      <ButtonGroup className="items-center p-4" align="end">
        <Switch
          isEnabledInitially={isEnabledInitially}
          Lable="Status"
          action={updateStatus}
        />
        <DeleteEvent />
      </ButtonGroup>
      {data && (
        <Table
          table={adminEventTable}
          columns={adminEventColumns}
          data={data}
          state={{ columnVisibility: { id: false } }}
        />
      )}
    </div>
  );
};

const DeleteEvent: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);

  const { mutate: handleDeleteEvent } = useMutation(
    () => axios.delete(`/api/event/${id}`),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success(`Event Deleted successfully`);
          router.push("/events");
        }
        if (error instanceof Error) toast.error(`Error: ${error.message}`);
      },
    }
  );

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)} color="warn">
        Delete
      </Button>
      <Modal title="Delete Event" state={{ open, setOpen }}>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this event? All of your data will be
          permanently removed. This action cannot be undone.
        </p>
        <ButtonGroup className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
          <Button onClick={() => handleDeleteEvent()}>Delete</Button>
          <Button color="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </ButtonGroup>
      </Modal>
    </Fragment>
  );
};

const StudentEventPage: FC = () => {
  const router = useRouter();
  const { id } = router.query as any;

  const event = useQuery(["event", id], () => fetchEvent(id));

  if (event.isLoading) {
    return <span>Loading...</span>;
  }

  if (event.error instanceof Error) {
    return <span>Error: {event.error.message}</span>;
  }

  return (
    <div className="flex flex-col w-max">
      <Table
        table={eventTable}
        columns={eventColumns}
        data={[event.data.result]}
        state={{ columnVisibility: { id: false } }}
      />
      <CTA
        branchesAllowed={event.data.result.branches_allowed}
        status={event.data.result.status}
        hasStudentApplied={event.data.applied}
      />
    </div>
  );
};

const CTA = ({
  branchesAllowed,
  status,
  hasStudentApplied,
}: {
  branchesAllowed: string[];
  status: string;
  hasStudentApplied: boolean;
}) => {
  const router = useRouter();
  const { id } = router.query as any;
  const {
    data: {
      user: { branch, validated },
    },
  }: { data: any } = useSession();
  const { mutate: handleApply } = useMutation(
    () => axios.post(`/api/event/${id}/apply`),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("Enrolled into Event Successfully");
          router.push("/events/applications");
        }
        if (error instanceof Error) toast.error(`Error: ${error.message}`);
      },
    }
  );

  let cta;
  if (status !== Status.Open) cta = "This event is closed";
  else if (hasStudentApplied) cta = "You have already applied";
  else if (!branchesAllowed.includes(branch) || !validated)
    cta = "You are not eligible";
  else cta = <Button onClick={() => handleApply(id)}>Apply</Button>;

  return <div className="self-end my-2">{cta}</div>;
};
const fetchEvent = async (id: string) => {
  const { data } = await axios.get(`/api/event/${id}`);
  return data;
};
