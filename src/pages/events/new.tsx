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
    await fetch(`/api/company/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        res = [...data];
      });
    return res;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = {
        company_id: selectedCompany?.id,
        title: jobtitleRef.current?.value,
        ctc: ctcRef.current?.value,
        type: typeRef.current?.value,
        branches_allowed: selectedBranches,
      };
      await fetch("/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/events");
    } catch (error) {
      console.error(error);
    }
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
