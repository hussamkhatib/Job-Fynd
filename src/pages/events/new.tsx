import { useRouter } from "next/router";
import { SyntheticEvent, useRef, useState } from "react";
import NavTabs from "../../components/NavTabs";
import { adminEventTabs } from "../../components/NavTabs/tabs";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Combobox from "../../components/ui/Combobox";
import TextField from "../../components/ui/TextField/TextField";
import ListBox from "../../components/ui/ListBox";
import { branches } from "../../store/student.data";
import axios from "axios";
import { toast } from "react-toastify";
import { EligibiltyOfferCount } from "@prisma/client";
import { trpc } from "../../utils/trpc";

const NewEvent = () => {
  return (
    <div>
      <NavTabs tabs={adminEventTabs} />
      <NewEventForm />
    </div>
  );
};

export default NewEvent;

const NewEventForm = () => {
  const router = useRouter();
  const _jobtitle = useRef<HTMLInputElement>(null!);
  const _ctc = useRef<HTMLInputElement>(null!);
  const _type = useRef<HTMLInputElement>(null!);
  const [selectedCompany, setSelectedCompany] = useState<any>();
  const [selectedBranches, setSelectedBranches] = useState<any>([]);
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
      company_id: selectedCompany?.id,
      title,
      ctc,
      type,
      branches_allowed: selectedBranches,
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
        type="text"
        id="ctc"
        ref={_ctc}
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
