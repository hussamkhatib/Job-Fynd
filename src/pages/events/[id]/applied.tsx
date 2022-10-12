import { FC, Fragment } from "react";
import { useRouter } from "next/router";
import Table from "../../../components/Table";
import { studentColumns } from "../../../store/student.data";
import { adminEventColumns } from "../../../store/events.data";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import NavTabs from "../../../components/NavTabs";
import { adminEventTabs } from "../../../components/NavTabs/tabs";
import { trpc } from "../../../utils/trpc";
import Loader from "../../../components/ui/Loader";
import Alert from "../../../components/ui/Alert";
import Error from "next/error";

const EventAppliedPage: FC = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.student) return <Error statusCode={403} />;

  return (
    <>
      <NavTabs tabs={adminEventTabs} />
      <EventAppliedTable />
    </>
  );
};

export default EventAppliedPage;

const EventAppliedTable = () => {
  const router = useRouter();
  const { id } = router.query as any;

  const eventDetails = trpc.useQuery(["admin.event.getById", { id }], {
    select: (data) => [data],
  });

  const appliedStudents = trpc.useQuery([
    "admin.event.id.applications",
    { id },
  ]);

  const isLoading = eventDetails.isLoading || appliedStudents.isLoading;
  if (isLoading) return <Loader />;

  if (eventDetails.error instanceof Error)
    return <Alert>{eventDetails.error.message}</Alert>;

  if (appliedStudents.error instanceof Error)
    return <Alert>{appliedStudents.error.message}</Alert>;

  return (
    <Fragment>
      <h2 className="px-2 pb-2 text-lg"> Event Details</h2>
      {eventDetails.data ? (
        <Table columns={adminEventColumns} data={eventDetails.data} />
      ) : null}
      <div className="px-2 py-2">
        {Array.isArray(eventDetails.data) && appliedStudents.data?.length ? (
          <Fragment>
            <h2 className="text-lg ">Applied Students</h2>
            <Table columns={studentColumns} data={appliedStudents.data} />
          </Fragment>
        ) : (
          <span>No one has applied for this event yet.</span>
        )}
      </div>
    </Fragment>
  );
};
