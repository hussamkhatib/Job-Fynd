import React, { FC, useState } from "react";
import Button from "../../../components/ui/Button";
import { useRouter } from "next/router";
import Table from "../../../components/Table";
import { adminEventCols, eventCols } from "../../../store/events.data";
import ButtonGroup from "../../../components/ui/Button/ButtonGroup";
import Modal from "../../../components/ui/Modal";
import { Role, Status } from "@prisma/client";
import { useSession } from "next-auth/react";
import Switch from "../../../components/ui/Switch";
import NavTabs from "../../../components/NavTabs";
import { studentEventTabs } from "../../../components/NavTabs/tabs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const EventPage = () => {
  const { data: session }: { data: any } = useSession();

  if (session?.user.role === Role.student) return <StudentEventPage />;
  if (session?.user.role === Role.admin) return <AdminEventPage />;
};

export default EventPage;

const fetchEvent = async (id: string) => {
  const { data } = await axios.get(`/api/event/${id}`);
  return data;
};

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
      onSuccess: () => {
        queryClient.invalidateQueries("event", id);
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
      <NavTabs tabs={studentEventTabs} />
      <ButtonGroup className="p-4" align="end">
        <Switch
          isEnabledInitially={isEnabledInitially}
          Lable="Status"
          action={updateStatus}
        />
        <DeleteEvent />
      </ButtonGroup>
      {data && <Table columns={adminEventCols} data={data} />}
    </div>
  );
};

const DeleteEvent: FC = () => {
  const router = useRouter();
  const { id } = router.query as any;
  const [open, setOpen] = useState(false);

  const { mutate: handleDeleteEvent } = useMutation(
    () => axios.delete(`/api/event/${id}`),
    {
      onSuccess: () => router.push("/events"),
    }
  );

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="danger">
        Delete
      </Button>
      <Modal
        title="Delete Event"
        content="Are you sure you want to delete  this event? All of your data will be permanently
removed. This action cannot be undone."
        action={handleDeleteEvent}
        state={{ open, setOpen }}
      />
    </>
  );
};

const fetchHasStudentAppliedForEvent = async (event_id: string) => {
  const { data } = await axios.get(
    `/api/event/${event_id}/has_student_applied`
  );
  return data.success;
};

const StudentEventPage: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query as any;

  const event: any = useQuery(["event", id], () => fetchEvent(id), {
    select: (event) => [event],
  });
  const { data: hasStudentApplied }: any = useQuery(
    ["hasStudentAppliedForEvent", id],
    () => fetchHasStudentAppliedForEvent(id)
  );

  const { mutate: handleApply } = useMutation(
    () => axios.post(`/api/event/${id}/student_enrollment`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("hasStudentAppliedForEvent", id);
      },
    }
  );

  if (event.isLoading) {
    return <span>Loading...</span>;
  }

  if (event.error instanceof Error) {
    return <span>Error: {event.error.message}</span>;
  }
  return (
    <div className="flex flex-col w-max">
      <NavTabs tabs={studentEventTabs} />
      <Table columns={eventCols} data={event.data} />
      <div className="self-end my-2">
        {hasStudentApplied !== null &&
          (hasStudentApplied ? (
            <div>You have already applied </div>
          ) : (
            <Button onClick={() => handleApply(id)}>Apply</Button>
          ))}
      </div>
    </div>
  );
};
