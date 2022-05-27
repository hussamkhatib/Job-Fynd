import React, { FC, useContext, useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { useRouter } from "next/router";
import user, { UserRole } from "../../../userContext";
import Table from "../../../components/Table";
import { adminEventCols, eventCols } from "../../../store/events.data";

const handleApply = async (event_id: number) => {
  try {
    const body = {
      student_id: 1,
      event_id,
    };

    await fetch("/api/event/student_enrollment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};

const EventPage = () => {
  const userRole = useContext(user);

  if (userRole === UserRole.student) return <StudentEventPage />;
  if (userRole === UserRole.admin) return <AdminEventPage />;
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
      <Table columns={adminEventCols} data={data} rowsCount={1} />
    </div>
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
      fetch(`/api/event/${id}/has_student_applied`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setHasStudentApplied(true);
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
