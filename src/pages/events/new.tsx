import { useRouter } from "next/router";
import { SyntheticEvent, useRef, useState } from "react";
import NavTabs from "../../components/NavTabs";
import { adminEventTabs } from "../../components/NavTabs/tabs";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Combobox from "../../components/ui/Combobox";
import Input from "../../components/ui/Input";
import ListBox from "../../components/ui/ListBox";
import { branches } from "../../store/student.data";
import { useMutation } from "react-query";
import axios from "axios";

const NewEvent = () => {
  const router = useRouter();
  const jobtitleRef = useRef<HTMLInputElement | null>(null);
  const ctcRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<HTMLInputElement | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>();
  const [selectedBranches, setSelectedBranches] = useState([]);

  const getFilteredList = async (query: string) => {
    if (query === "") return [];
    let res;
    await fetch(`/api/company?search=${query}*`)
      .then((res) => res.json())
      .then((data) => {
        res = [...data];
      });
    return res;
  };
  const { mutate: addNewEvent } = useMutation(
    ({ company_id, title, ctc, type, branches_allowed }: any) =>
      axios.post("/api/event", {
        company_id,
        title,
        ctc,
        type,
        branches_allowed,
      })
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
    await router.push("/events");
  };

  return (
    <div>
      <NavTabs tabs={adminEventTabs} />
      <form onSubmit={handleSubmit}>
        <Combobox
          selected={selectedCompany}
          setSelected={setSelectedCompany}
          getFilteredList={getFilteredList}
          Label="Company Name"
        />
        <div className="flex flex-col">
          <label htmlFor="jobtitle">
            <span className="label-text">Job Title</span>
          </label>
          <Input
            name="jobtitle"
            type="text"
            id="jobtitle"
            ref={jobtitleRef}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ctc">
            <span className="label-text">CTC</span>
          </label>
          <Input name="ctc" type="text" id="ctc" ref={ctcRef} required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="type">
            <span className="label-text">Type</span>
          </label>
          <Input name="type" type="text" id="type" ref={typeRef} required />
        </div>
        <ListBox
          selected={selectedBranches}
          setSelected={setSelectedBranches}
          list={branches}
          Label="Branches allowed"
          multiple
        />
        <ButtonGroup className="pt-4" align="end">
          {/* <Button>Cancel</Button> */}
          <Button type="submit">Create</Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default NewEvent;
