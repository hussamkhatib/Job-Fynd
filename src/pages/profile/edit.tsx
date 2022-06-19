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
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Edit = () => {
  const router = useRouter();

  const { isLoading, data, error } = useQuery(
    "studentProfile",
    fetchStudentProfile,
    {
      select: (student) => {
        return {
          id: student.id,
          name: student.name,
          usn: student.usn,
          validated: student.validated,
          branch: student?.branch,
        };
      },
    }
  );
  const { mutate } = useMutation(
    (values) => axios.patch(`/api/me/update`, values),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("Profile Updated");
          router.push("/profile/overview");
        }
        if (error instanceof Error) toast.error(`Error: ${error.message}`);
      },
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  console.log(data);

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
    const { name, usn } = state;
    const values = {
      name,
      usn,
      branch: selectedBranch,
    };
    await mutate(values);
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
        <ListBox
          Label="Branch"
          selected={selectedBranch}
          setSelected={setSelectedBranch}
          list={branches}
        />

        <ButtonGroup className="pt-4" align="end">
          {/* <Button>Cancel</Button> */}
          <Button type="submit">Request For Validation</Button>
        </ButtonGroup>
      </form>
    </Fragment>
  );
};

const fetchStudentProfile = async () => {
  const { data } = await axios.get(`/api/me`);
  return data;
};
