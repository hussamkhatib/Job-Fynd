import NavTabs from "../../components/NavTabs";
import { profileTabs } from "../../components/NavTabs/tabs";
import {
  ChangeEvent,
  Fragment,
  SyntheticEvent,
  useReducer,
  useState,
} from "react";
import Input from "../../components/ui/Input";
import ListBox from "../../components/ui/ListBox";

import reducer from "../../store/student.reducer";
import { branches } from "../../store/student.data";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { validationMsg } from "../../store/student.data";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

const fetchStudentProfile = async (usn: string) => {
  const { data } = await axios.get(`/api/student/${usn}`);
  return data;
};

const Edit = () => {
  const { data: session }: { data: any } = useSession();
  const { usn } = session.user;

  const { isLoading, data, error } = useQuery(
    ["studentProfile", usn],
    () => fetchStudentProfile(usn),
    {
      select: (student) => {
        return {
          id: student.id,
          name: student.name,
          usn: student.usn,
          validated: student.validated,
          resume: student.resume,
          branch: student.branch,
        };
      },
    }
  );
  const { mutate } = useMutation((values) =>
    axios.patch(`/api/student/${usn}`, values)
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <NavTabs tabs={profileTabs} />
      <StudentProfileForm student={data} onSubmit={mutate} />
    </div>
  );
};

export default Edit;

const StudentProfileForm = ({ student, onSubmit }: any) => {
  const [state, dispatch] = useReducer(reducer, student);
  const [selectedBranch, setSelectedBranch] = useState(student.branch);
  const { status, description } = validationMsg[state?.validated];

  const inputAction = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "textInput",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  const handleSubmit = (mutate: any) => async (e: SyntheticEvent) => {
    e.preventDefault();
    const { name, usn, resume } = state;
    const values = {
      name,
      usn,
      resume,
      validated: "pending",
      branch: selectedBranch,
    };
    await mutate(values);
    dispatch({ type: "sendForValidation" });
  };

  return (
    <Fragment>
      <Alert status={status}>{description}</Alert>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
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
          <label htmlFor="resume">
            <span className="label-text">Link to resume</span>
          </label>
          <Input
            value={state.resume}
            name="resume"
            type="text"
            id="resume"
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
          {/* <Button>Cancel</Button> */}
          <Button type="submit">Send for validation</Button>
        </ButtonGroup>
      </form>
    </Fragment>
  );
};
