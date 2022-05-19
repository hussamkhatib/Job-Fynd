import NavTabs from "../../components/NavTabs";
import { profileTabs } from "../../components/NavTabs/tabs";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
import Input from "../../components/ui/Input";
import ListBox from "../../components/ui/ListBox";

import reducer, { initialValue } from "../../store/student.reducer";
import { branches } from "../../store/student.data";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Button from "../../components/ui/Button";

const Edit = () => {
  const [selectedBranch, setSelectedBranch] = useState();
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    fetch("/api/student/1")
      .then((res) => res.json())
      .then((data) => {
        const { name, usn, email, branch } = data;
        dispatch({
          type: "init",
          payload: { name, usn, email },
        });
        setSelectedBranch(branch);
      });
  }, []);

  const inputAction = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "textInput",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  return (
    <div>
      <NavTabs tabs={profileTabs} />
      <form>
        <div className="flex flex-col">
          <label htmlFor="name">
            <span className="label-text">Name</span>
          </label>
          <Input
            value={state.name}
            name="name"
            type="text"
            id="name"
            onChange={inputAction}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="usn">
            <span className="label-text">USN</span>
          </label>
          <Input
            value={state.usn}
            name="usn"
            type="text"
            id="usn"
            onChange={inputAction}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <Input
            value={state.email}
            name="email"
            type="text"
            id="email"
            onChange={inputAction}
            required
          />
        </div>

        <ListBox
          Label="Branch"
          selected={selectedBranch}
          setSelected={setSelectedBranch}
          list={branches}
        />
        <ButtonGroup className="pt-4" align="end">
          <Button>Cancel</Button>
          <Button>Send for validation</Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default Edit;
