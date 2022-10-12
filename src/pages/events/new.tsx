import { useRouter } from "next/router";
import { SyntheticEvent, useRef, useState } from "react";
import NavTabs from "../../components/NavTabs";
import { adminEventTabs } from "../../components/NavTabs/tabs";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Combobox from "../../components/ui/Combobox";
import TextField from "../../components/ui/TextField";
import ListBox from "../../components/ui/ListBox";
import { branches } from "../../store/student.data";
import axios from "axios";
import { toast } from "react-toastify";
import { Branch, EligibiltyOfferCount, Role } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import Error from "next/error";
import { useSession } from "next-auth/react";

const NewEvent = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.student) return <Error statusCode={403} />;
  return (
    <>
      <NavTabs tabs={adminEventTabs} />
      <NewEventForm />
    </>
  );
};

export default NewEvent;

const NewEventForm = () => {
  const router = useRouter();
  const _jobtitle = useRef<HTMLInputElement>(null!);
  const _ctc = useRef<HTMLInputElement>(null!);
  const _type = useRef<HTMLInputElement>(null!);
  const [selectedCompany, setSelectedCompany] = useState<any>();
  const [selectedBranches, setSelectedBranches] = useState<Branch[]>([]);
  const [offerCountEligibility, setOfferCountEligibility] = useState<any>();

  const getFilteredList = async (query: string) => {
    if (query === "") return [];
    const { data } = await axios.get(`/api/company?search=${query}*`);
    return data;
  };

  const addNewEvent = trpc.useMutation(["admin.event.create"], {
    onSettled: (data, error) => {
      if (data) {
        toast.success("New Event Created Successfully");
        router.push("/events");
      }
      if (error instanceof Error) toast.error(`Errror ! ${error.message}`);
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const title = _jobtitle.current?.value;
    const ctc = _ctc.current?.value;
    const type = _type.current?.value;
    addNewEvent.mutate({
      companyId: selectedCompany?.id,
      title,
      ctc: +ctc,
      type,
      branchesAllowed: selectedBranches,
      eligibilityOfferCount: offerCountEligibility,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Combobox
        selected={selectedCompany}
        setSelected={setSelectedCompany}
        getFilteredList={getFilteredList}
        Label="Company Name"
        customEmptyComponent={
          <div className="px-4 py-2">
            <span>Nothing found</span>
            <Button
              color="minimal"
              size="sm"
              target="_blank"
              rel="noreferrer"
              href="/companies/new"
              EndIcon={ExternalLinkIcon}
            >
              Create New Company
            </Button>
          </div>
        }
      />

      <TextField
        name="jobtitle"
        type="text"
        id="jobtitle"
        ref={_jobtitle}
        required
        label="Job Title"
      />

      <TextField
        name="ctc"
        type="number"
        id="ctc"
        ref={_ctc}
        min={0}
        step={0.1}
        required
        label="CTC"
      />

      <TextField
        name="type"
        type="text"
        id="type"
        ref={_type}
        required
        label="Type"
      />
      <ListBox
        selected={selectedBranches}
        setSelected={setSelectedBranches}
        list={branches}
        Label="Branches allowed"
        multiple
      />
      <ListBox
        selected={offerCountEligibility}
        setSelected={setOfferCountEligibility}
        list={eligibilityOfferCountList}
        Label="Eligibilty: Offer Count"
      />
      <ButtonGroup className="pt-2" align="end">
        <Button type="submit" loading={addNewEvent.isLoading}>
          Create
        </Button>
      </ButtonGroup>
    </form>
  );
};

const eligibilityOfferCountList = Object.values(EligibiltyOfferCount);
