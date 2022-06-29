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
import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

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
  const jobtitleRef = useRef<HTMLInputElement>(null!);
  const ctcRef = useRef<HTMLInputElement>(null!);
  const typeRef = useRef<HTMLInputElement>(null!);
  const [selectedCompany, setSelectedCompany] = useState<any>();
  const [selectedBranches, setSelectedBranches] = useState<any>([]);

  const getFilteredList = async (query: string) => {
    if (query === "") return [];
    const { data } = await axios.get(`/api/company?search=${query}*`);
    return data;
  };

  const { mutate: addNewEvent, isLoading } = useMutation(
    ({ company_id, title, ctc, type, branches_allowed }: any) =>
      axios.post("/api/event", {
        company_id,
        title,
        ctc,
        type,
        branches_allowed,
      }),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("New Event Created Successfully");
          router.push("/events");
        }
        if (error instanceof Error) toast.error(`Errror ! ${error.message}`);
      },
    }
  );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const title = jobtitleRef.current?.value;
    const ctc = ctcRef.current?.value;
    const type = typeRef.current?.value;

    addNewEvent({
      company_id: selectedCompany?.id,
      title,
      ctc,
      type,
      branches_allowed: selectedBranches,
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
        ref={jobtitleRef}
        required
        label="Job Title"
      />

      <TextField
        name="ctc"
        type="text"
        id="ctc"
        ref={ctcRef}
        required
        label="CTC"
      />

      <TextField
        name="type"
        type="text"
        id="type"
        ref={typeRef}
        required
        label="Types"
      />
      <ListBox
        selected={selectedBranches}
        setSelected={setSelectedBranches}
        list={branches}
        Label="Branches allowed"
        multiple
      />
      <ButtonGroup className="pt-4" align="end">
        <Button type="submit" loading={isLoading}>
          Create
        </Button>
      </ButtonGroup>
    </form>
  );
};
