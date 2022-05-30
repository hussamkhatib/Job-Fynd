import React, { FC, useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { useRouter } from "next/router";
import Table from "../../../components/Table";
import { adminEventCols, eventCols } from "../../../store/events.data";
import ButtonGroup from "../../../components/ui/Button/ButtonGroup";
import Modal from "../../../components/ui/Modal";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";

const handleApply = async (event_id: number) => {
  try {
    await fetch(`/api/event/${event_id}/student_enrollment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
  }
};

const EventPage = () => {
  const { data: session }: { data: any } = useSession();

  if (session?.user.role === Role.student) return <StudentEventPage />;
  if (session?.user.role === Role.admin) return <AdminEventPage />;
};

export default EventPage;

const AdminEventPage: FC = () => {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { id } = router.query as any;

  useEffect(() => {
    id &&
      (async () => {
        const response = await fetch(`/api/event/${id}`);
        const json = await response.json();
        setData([json]);
        setIsLoaded(true);
      })();
  }, [id]);
  if (!isLoaded) return <div>loading...</div>;
  return (
    <div>
      <ButtonGroup className="p-4" align="end">
        <Button>Change Status</Button>
        <DeleteEvent />
      </ButtonGroup>
      <Table columns={adminEventCols} data={data} rowsCount={1} />
    </div>
  );
};

const DeleteEvent: FC = () => {
  const router = useRouter();
  const { id } = router.query as any;
  const [open, setOpen] = useState(false);
  const handleDeleteEvent = async () => {
    await fetch(`/api/event/${id}`, {
      method: "DELETE",
    });
    router.push("/events");
  };
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
const StudentEventPage: FC = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<any>();
  const [hasStudentApplied, setHasStudentApplied] = useState<boolean | null>(
    null
  );
  // todo: fix the "as any" type
  const { id } = router.query as any;
  useEffect(() => {
    if (id) {
      fetch(`/api/event/${id}/has-student-applied`)
        .then((res) => res.json())
        .then((data) => {
          setHasStudentApplied(data.success || false);
        });
      fetch(`/api/event/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setData([data]);
          setIsLoaded(true);
        });
    }
  }, [id]);
  if (!isLoaded) return <div>loading...</div>;
  return (
    <div>
      <Table columns={eventCols} rowsCount={1} data={data} />
      {hasStudentApplied !== null &&
        (hasStudentApplied ? (
          <div>You have already applied </div>
        ) : (
          <Button onClick={() => handleApply(id)}>Apply</Button>
        ))}
    </div>
  );
};
