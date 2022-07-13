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
import { EligibiltyOfferCount, Role, Status, Validation } from "@prisma/client";
import { useSession } from "next-auth/react";
import Switch from "../../../components/ui/Switch";
import NavTabs from "../../../components/NavTabs";
import {
  adminEventTabs,
  studentEventTabs,
} from "../../../components/NavTabs/tabs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import AxiosErrorMsg from "../../../components/AxiosErrorMsg";

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

  const { isLoading, data, error }: any = useQuery(["event", id], () =>
    fetchEvent(id)
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
  const isEnabledInitially = data?.status === Status.Open;
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
          data={[data]}
          state={{ columnVisibility: { id: false } }}
        />
      )}
      <section className="my-4">
        <h3 className="text-lg">Eligibility</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Branches Allowed</div>
          <div className="flex-1 text-gray-700">
            {data?.branches_allowed.join(", ")}
          </div>
        </div>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Offer Count</div>
          <div className="flex-1 text-gray-700">
            {data?.eligibilityOfferCount}
          </div>
        </div>
      </section>
    </div>
  );
};

const DeleteEvent: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);

  const { mutate: handleDeleteEvent, isLoading } = useMutation(
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
        Delete Event
      </Button>
      <Modal title="Delete Event" state={{ open, setOpen }}>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this event? All of your data will be
          permanently removed. This action cannot be undone.
        </p>
        <ButtonGroup className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
          <Button onClick={() => handleDeleteEvent()} loading={isLoading}>
            Delete
          </Button>
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

  const { data, isLoading, error } = useQuery(["event", id], () =>
    fetchEvent(id)
  );

  return (
    <div className="flex flex-col w-max">
      {isLoading ? (
        <span>Loading...</span>
      ) : error instanceof Error ? (
        <AxiosErrorMsg error={error as AxiosError} />
      ) : (
        <Fragment>
          <Table
            table={eventTable}
            columns={eventColumns}
            data={[data.result]}
            state={{ columnVisibility: { id: false } }}
          />
          <section className="my-4">
            <h3 className="text-lg">Eligibility</h3>
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Branches Allowed</div>
              <div className="flex-1 text-gray-700">
                {data?.result?.branches_allowed.join(", ")}
              </div>
            </div>
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Offer Count</div>
              <div className="flex-1 text-gray-700">
                {data?.result?.eligibilityOfferCount}
              </div>
            </div>
          </section>
          <div className="self-end my-2">
            <StudentEventEnrollment
              branchesAllowed={data.result.branches_allowed}
              status={data.result.status}
              hasStudentApplied={data.applied}
              eligibilityOfferCount={data?.result?.eligibilityOfferCount}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

const StudentEventEnrollment = ({
  branchesAllowed,
  status,
  hasStudentApplied,
  eligibilityOfferCount,
}: {
  branchesAllowed: string[];
  status: string;
  hasStudentApplied: boolean;
  eligibilityOfferCount: any;
}) => {
  const router = useRouter();
  const { id } = router.query as any;
  const {
    data: {
      user: { branch, validated, offercount },
    },
  }: { data: any } = useSession();
  const handleApply = useMutation(() => axios.post(`/api/event/${id}/apply`), {
    onSettled: (data, error) => {
      if (data) {
        toast.success("Enrolled into Event Successfully");
        router.push("/events/applications");
      }
      if (error instanceof Error)
        toast.error(<AxiosErrorMsg error={error as AxiosError} />);
    },
  });
  if (hasStudentApplied) return <>You have applied for this Event</>;
  if (status !== Status.Open) return <>This event is closed</>;
  if (!branchesAllowed.includes(branch))
    return <>This Event is not open for your branch</>;
  if (validated !== Validation.validated)
    return <>Your Profile is not validated yet.</>;
  const maxOffers =
    eligibilityOfferCount === EligibiltyOfferCount.zero
      ? 0
      : eligibilityOfferCount === EligibiltyOfferCount.atmost1
      ? 1
      : eligibilityOfferCount === EligibiltyOfferCount.atmost2
      ? 2
      : 10; // 10 is open for all
  if (offercount >= maxOffers)
    return <>Your Offer Counts are more than the eligibilty offer Count</>;
  return (
    <Button
      onClick={() => handleApply.mutate()}
      loading={handleApply.isLoading}
    >
      Apply
    </Button>
  );
};
const fetchEvent = async (id: string) => {
  const { data } = await axios.get(`/api/event/${id}`);
  return data;
};
