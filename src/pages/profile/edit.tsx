import NavTabs from "../../components/NavTabs";
import { profileTabs } from "../../components/NavTabs/tabs";
import { SyntheticEvent, useRef, useState } from "react";
import TextField from "../../components/ui/TextField/TextField";
import ListBox from "../../components/ui/ListBox";

import { branches, genders } from "../../store/student.data";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Button from "../../components/ui/Button";
import { useMutation, useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import AxiosErrorMsg from "../../components/AxiosErrorMsg";

const Edit = () => {
  return (
    <div>
      <NavTabs tabs={profileTabs} />
      <EditStudentProfile />
    </div>
  );
};

export default Edit;

const EditStudentProfile = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null!);
  const usnRef = useRef<HTMLInputElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);
  const [branch, setBranch] = useState();
  const [gender, setGender] = useState();

  const { isLoading, data, error } = useQuery(
    ["studentProfile", "?profile=full"],
    fetchStudentProfile
  );
  const editProfile = useMutation(
    (values: any) => axios.patch(`/api/me/update`, values),
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

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const usn = usnRef.current.value;
    const values = { name, email, usn, gender, branch };
    editProfile.mutate(values);
  };
  return (
    <div className="max-w-xl pt-4 mx-auto">
      {isLoading ? (
        <span>Loading...</span>
      ) : error instanceof Error ? (
        <AxiosErrorMsg error={error as AxiosError} />
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            ref={nameRef}
            defaultValue={data?.name}
            name="name"
            id="name"
            label="Name"
          />
          <TextField
            ref={usnRef}
            defaultValue={data?.usn}
            name="usn"
            id="usn"
            label="USN"
          />
          <TextField
            ref={emailRef}
            defaultValue={data?.email}
            name="email"
            id="email"
            disabled
            label="Email"
          />
          <ListBox
            Label="Gender"
            selected={gender ?? data.gender}
            setSelected={setGender}
            list={genders}
          />
          <ListBox
            Label="Branch"
            selected={branch ?? data.branch}
            setSelected={setBranch}
            list={branches}
          />
          <ButtonGroup className="pt-4" align="end">
            <Button type="submit" loading={editProfile.isLoading}>
              Save Details
            </Button>
          </ButtonGroup>
        </form>
      )}
    </div>
  );
};

const fetchStudentProfile = async () => {
  const { data } = await axios.get(`/api/me?profile=full`);
  return data;
};
