import { FC, Fragment, SyntheticEvent, useRef, useState } from "react";
import Button from "../../../components/ui/Button";
import { useRouter } from "next/router";
import Table from "../../../components/Table";
import { adminEventColumns, eventColumns } from "../../../store/events.data";
import ButtonGroup from "../../../components/ui/Button/ButtonGroup";
import Modal from "../../../components/ui/Modal";
import {
  Branch,
  EligibiltyOfferCount,
  EventResult,
  Role,
  Status,
  Validation,
} from "@prisma/client";
import { useSession } from "next-auth/react";
import Switch from "../../../components/ui/Switch";
import NavTabs from "../../../components/NavTabs";
import {
  adminEventTabs,
  studentEventTabs,
} from "../../../components/NavTabs/tabs";
import { toast } from "react-toastify";
import FileUploader from "../../../components/FileUploader";
import TextField from "../../../components/ui/TextField";
import { FileType } from "../../../components/FileUploader/FileUploader.types";
import { trpc } from "../../../utils/trpc";
import Loader from "../../../components/ui/Loader";

const EventPage = () => {
  const { data: session } = useSession();
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
  const utils = trpc.useContext();

  const { id } = router.query as any;

  const { isLoading, data, error } = trpc.useQuery([
    "admin.event.getById",
    { id },
  ]);

  const updateStatusMutation = trpc.useMutation(["admin.event.update"], {
    onSettled: (data, error) => {
      if (data) {
        const { status } = data;
        toast.success(`event is now ${status}`);
        utils.setQueryData(["admin.event.getById", { id }], data);
      }
      if (error instanceof Error) toast.error(`Error: ${error.message}`);
    },
  });

  const updateStatus = async (checked: boolean) => {
    updateStatusMutation.mutate({
      id,
      status: checked ? Status.Open : Status.Close,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  const isEnabledInitially = data?.status === Status.Open;
  console.log(data);
  return (
    <div>
      <ButtonGroup className="items-center px-4 py-2" align="end">
        <Switch
          isEnabledInitially={isEnabledInitially}
          Lable="Status"
          action={updateStatus}
        />
        <DeleteEvent />
      </ButtonGroup>
      {data && <Table columns={adminEventColumns} data={[data]} />}
      <section className="my-4">
        <h3 className="text-lg">Eligibility</h3>
        <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
          <div className="text-gray-400 ">Branches Allowed</div>
          <div className="flex-1 text-gray-700">
            {data?.branchesAllowed
              .map((branch: { name: Branch }) => branch?.name)
              .join(", ")}
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

  const handleDeleteEvent = trpc.useMutation(["admin.event.delete"], {
    onSettled: (data, error) => {
      if (data) {
        toast.success(`Event Deleted successfully`);
        router.push("/events");
      }
      if (error instanceof Error) toast.error(`Error: ${error.message}`);
    },
  });

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
        <ButtonGroup className="px-4 py-1 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-reverse ">
          {typeof id === "string" && (
            <Button
              onClick={() =>
                handleDeleteEvent.mutate({
                  id,
                })
              }
              loading={handleDeleteEvent.isLoading}
            >
              Delete
            </Button>
          )}
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

  const { data, isLoading, error } = trpc.useQuery(["events.getById", { id }]);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error instanceof Error ? (
        // TODO:3a8f839d-357b-441b-a4fc-6b1d83c31f30
        <span>Error</span>
      ) : data ? (
        <Fragment>
          <Table columns={eventColumns} data={[data.data]} />
          <section className="my-4">
            <h3 className="text-lg">Eligibility</h3>
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Branches Allowed</div>
              <div className="flex-1 text-gray-700">
                {data?.data?.branchesAllowed
                  .map((branch: { name: Branch }) => branch?.name)
                  .join(", ")}
              </div>
            </div>
            <div className="grid space-x-2 grid-cols-[8rem_1fr] my-2">
              <div className="text-gray-400 ">Offer Count</div>
              <div className="flex-1 text-gray-700">
                {data?.data?.eligibilityOfferCount}
              </div>
            </div>
          </section>
          <div className="my-2 ">
            {data?.result ? (
              <>
                {data?.result === EventResult.placed && <>You are Placed</>}
                {data?.result === EventResult.rejected && <>You are Rejected</>}
                {data?.result === EventResult.pending && (
                  <UpdateStudentResult />
                )}
              </>
            ) : (
              <StudentEventEnrollment
                branchesAllowed={data?.data?.branchesAllowed.map(
                  (branch: { name: Branch }) => branch?.name
                )}
                status={data?.data?.status}
                eligibilityOfferCount={data?.data?.eligibilityOfferCount}
              />
            )}
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

const StudentEventEnrollment = ({
  branchesAllowed,
  status,
  eligibilityOfferCount,
}: {
  branchesAllowed: string[];
  status: string;
  eligibilityOfferCount: any;
}) => {
  const router = useRouter();
  const { data: user, isLoading, error } = trpc.useQuery(["users.me"]);
  const { id } = router.query as any;

  const handleApply = trpc.useMutation(["events.id.apply"], {
    onSettled: (data, error) => {
      if (data) {
        toast.success("Enrolled into Event Successfully");
        router.push("/events/applications");
      }
      if (error instanceof Error) toast.error(`Error : ${error.message}`);
    },
  });

  //TODO:
  if (isLoading || error) return null;

  if (status !== Status.Open) return <>This event is closed</>;

  if (user?.studentRecord?.validated !== Validation.validated)
    return <>Your Profile is not validated yet.</>;

  if (!branchesAllowed.includes(user?.studentRecord?.branch || ""))
    return <>This Event is not open for your branch</>;

  const maxOffers =
    eligibilityOfferCount === EligibiltyOfferCount.zero
      ? 0
      : eligibilityOfferCount === EligibiltyOfferCount.atmost1
      ? 1
      : eligibilityOfferCount === EligibiltyOfferCount.atmost2
      ? 2
      : 10; // 10 is open for all
  if (user._count.offer && user._count.offer >= maxOffers)
    return <>Your Offer Counts are more than the eligibilty offer Count</>;
  return (
    <Button
      onClick={() => handleApply.mutate({ id })}
      loading={handleApply.isLoading}
    >
      Apply
    </Button>
  );
};

const UpdateStudentResult = () => {
  const router = useRouter();
  const utils = trpc.useContext();

  const { id } = router.query;
  const [open, setOpen] = useState(false);
  const _result = useRef<EventResult>(EventResult.pending);
  const _ctc = useRef<HTMLInputElement>(null!);
  const _file = useRef<FileType>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const studentPlaced = trpc.useMutation(["events.id.acceptOffer"], {
    onSettled: (data, error) => {
      if (data) {
        toast.success("Uploaded Offer Successfully");
        if (typeof id === "string")
          utils.invalidateQueries(["events.getById", { id }]);
      }
      if (error instanceof Error) toast.error(`Error: ${error.message}`);
      setOpen(false);
    },
  });
  const studentRejected = trpc.useMutation(["events.id.rejectOffer"], {
    onSettled: (data, error) => {
      if (data) {
        toast.success("Rejected Successfully");
        if (typeof id === "string")
          utils.invalidateQueries(["events.getById", { id }]);
      }
      if (error instanceof Error) toast.error(`Error: ${error.message}`);
      setOpen(false);
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const ctc = _ctc.current?.value;
    const file = _file.current;

    if (file && fileName && typeof id === "string") {
      studentPlaced.mutate({
        id,
        ctc,
        file: fileName,
        buffer: file,
        result: EventResult.placed,
      });
    } else {
      toast.error(`Errror ! No file found`);
    }
  };
  return (
    <Fragment>
      <p>You have Applied for this Event</p>
      <ButtonGroup>
        <p>Result Pending:</p>

        <Button
          size="sm"
          color="warn"
          className="mb-2"
          onClick={() => {
            _result.current = EventResult.rejected;
            setOpen(true);
          }}
          loading={studentPlaced.isLoading}
        >
          Rejected
        </Button>
        <Button
          size="sm"
          className="mb-2"
          onClick={() => {
            _result.current = EventResult.placed;
            setOpen(true);
          }}
          loading={studentRejected.isLoading || studentPlaced.isLoading}
        >
          Accepted (Upload Offer)
        </Button>
      </ButtonGroup>
      {_result.current === EventResult.rejected && (
        <Modal state={{ open, setOpen }}>
          <p>
            Are you sure, you got Rejected in this Event.This cannot be undone.
          </p>
          <ButtonGroup align="end" className="py-1">
            <Button color="secondary" onClick={() => setOpen(false)}>
              No
            </Button>
            {typeof id === "string" && (
              <Button
                loading={studentRejected.isLoading || studentPlaced.isLoading}
                onClick={() =>
                  studentRejected.mutate({
                    id,
                    result: EventResult.rejected,
                  })
                }
              >
                Yes
              </Button>
            )}
          </ButtonGroup>
        </Modal>
      )}

      {_result.current === EventResult.placed && (
        <Modal title="Add New Offer" state={{ open, setOpen }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="ctc"
              type="text"
              id="ctc"
              ref={_ctc}
              fullWidth
              required
              label="CTC"
            />
            <div className="flex flex-col pt-4">
              <FileUploader
                accept=".PDF"
                onChange={(file) => {
                  setFileName(file?.name ?? null);
                  _file.current = file?.file;
                }}
                label="Select Offer"
                required
                fileName={fileName}
                id="offer-letter"
              />
            </div>
            <ButtonGroup align="end" className="py-1">
              <Button color="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button loading={studentPlaced.isLoading} type="submit">
                Submit
              </Button>
            </ButtonGroup>
          </form>
        </Modal>
      )}
    </Fragment>
  );
};
