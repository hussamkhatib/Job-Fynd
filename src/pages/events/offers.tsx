/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { offerColumns, offerTable } from "../../store/offer.data";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { SyntheticEvent, useRef, useState } from "react";
import Modal from "../../components/ui/Modal";
import TextField from "../../components/ui/TextField/TextField";
import ListBox from "../../components/ui/ListBox";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import FileUploader from "../../components/FileUploader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../lib/firebase";

const Offers = () => {
  const { data: session }: { data: any } = useSession();
  if (session?.user.role === Role.admin) return null;

  return (
    <div>
      <NavTabs tabs={studentEventTabs} />
      <AddNewOffer />
      <StudentOffers />
    </div>
  );
};

export default Offers;

const AddNewOffer = () => {
  const { data: session }: { data: any } = useSession();
  const { usn } = session.user;
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const ctcRef = useRef<HTMLInputElement>(null!);
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [file, setFile] = useState<File | null>(null);

  const { isLoading, data, error } = useQuery(
    "studentApplications",
    fetchStudentApplications,
    {
      enabled: open,
      select: (event) =>
        event.map((e: any) => {
          return {
            id: e.id,
            name: `${e.company}(${e.title})`,
          };
        }),
    }
  );

  const { mutate: addNewOffer, isLoading: isloadingMutation } = useMutation(
    ({ ctc, offer_letter, event_id }: any) =>
      axios.post(`/api/event/${event_id}/uploadoffer`, {
        ctc,
        offer_letter,
        event_id,
      }),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("Uploaded Offer Successfully");
          queryClient.invalidateQueries("studentOffers");
        }
        if (error instanceof Error) toast.error(`Errror ! ${error.message}`);
      },
    }
  );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const ctc = ctcRef.current?.value;
    const event_id = selectedEvent.id;

    if (file) {
      const imageRef = ref(storage, `/offers/${usn}${event_id}`);
      await uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          addNewOffer({
            ctc,
            offer_letter: url,
            event_id,
          });
        });
      });
    } else {
      toast.error(`Errror ! No file found`);
    }
    setOpen(false);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="flex justify-end">
      <Button
        className="mb-2"
        onClick={() => setOpen(true)}
        loading={isloadingMutation}
      >
        Upload New Offer
      </Button>
      <Modal title="Add New Offer" state={{ open, setOpen }}>
        <form onSubmit={handleSubmit}>
          <ListBox
            selected={selectedEvent}
            setSelected={setSelectedEvent}
            list={data}
            Label="Event"
          />

          <TextField
            name="ctc"
            type="text"
            id="ctc"
            ref={ctcRef}
            fullWidth
            required
            label="CTC"
          />
          <div className="flex flex-col pt-4">
            <FileUploader
              accept=".pdf"
              onChange={(file) => {
                setFile(file);
              }}
              label="Select Offer"
              fileName={file && file?.name}
              id="offer-letter"
            />
          </div>
          <div className="flex justify-end py-3 bg-gray-50 ">
            <button
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium border border-black rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const StudentOffers = () => {
  const { isLoading, data, error } = useQuery(
    "studentOffers",
    fetchStudentOffers
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  if (Array.isArray(data) && !data.length)
    return <span>You have no offers yet.</span>;
  return <Table table={offerTable} columns={offerColumns} data={data} />;
};

const fetchStudentOffers = async () => {
  const { data } = await axios.get(`/api/me/offers`);
  return data;
};

const fetchStudentApplications = async () => {
  const { data } = await axios.get(`/api/me/applications`);
  return data;
};
