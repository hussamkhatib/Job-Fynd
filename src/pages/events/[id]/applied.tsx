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

const EventAppliedPage: FC = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.student) return null;

  return (
    <div>
      <NavTabs tabs={adminEventTabs} />
      <EventAppliedTable />
    </div>
  );
};

export default EventAppliedPage;

const EventAppliedTable = () => {
  const router = useRouter();
  const { id } = router.query as any;

  const eventDetails = trpc.useQuery(["events.getById", { id }], {
    select: (data) => [data],
  });

  const appliedStudents = trpc.useQuery(["events.id.applications", { id }]);

  const isLoading = eventDetails.isLoading || appliedStudents.isLoading;
  if (isLoading) return <span>Loading...</span>;

  if (eventDetails.error instanceof Error) {
    <span>Error: {eventDetails.error.message}</span>;
  }
  if (appliedStudents.error instanceof Error) {
    <span>Error: {appliedStudents.error.message}</span>;
  }
  if (eventDetails.error instanceof Error) return <span>error</span>;
  if (appliedStudents.error instanceof Error) return <span>error</span>;
  return (
    <Fragment>
      <h2 className="px-2 pb-2 text-lg"> Event Details</h2>
      {eventDetails.data ? (
        <Table
          columns={adminEventColumns}
          data={eventDetails.data}
          state={{ columnVisibility: { id: false } }}
        />
      ) : null}
      <div className="px-2 py-2">
        {Array.isArray(eventDetails.data) && appliedStudents.data?.length ? (
          <Fragment>
            <h2 className="text-lg ">Applied Students</h2>
            <Table
              columns={studentColumns}
              data={appliedStudents.data}
              state={{ columnVisibility: { id: false } }}
            />
          </Fragment>
        ) : (
          <span>No one has applied for this event yet.</span>
        )}
      </div>
    </Fragment>
  );
};
