import NavTabs from "../../components/NavTabs";
import { profileTabs } from "../../components/NavTabs/tabs";
import { SyntheticEvent, useRef, useState } from "react";
import TextField from "../../components/ui/TextField";
import ListBox from "../../components/ui/ListBox";

import { branches, genders } from "../../store/student.data";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";
import ZodFieldErrors from "../../components/ZodFieldErrors";

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
  const _name = useRef<HTMLInputElement>(null!);
  const _usn = useRef<HTMLInputElement>(null!);
  const _personalEmail = useRef<HTMLInputElement>(null!);
  const [branch, setBranch] = useState();
  const [gender, setGender] = useState();

  const { data, error, isLoading } = trpc.useQuery(["users.me"], {
    select: (data) => data?.studentRecord ?? null,
  });

  const editProfile = trpc.useMutation(["users.me.update.profile"], {
    onSuccess: () => {
      toast.success("Profile Updated");
      router.push("/profile/overview");
    },
    onError: (err) => {
      const zodError = err.data?.zodError;
      toast.error(
        zodError ? (
          // TODO: Toast will be bad for a11y in case of fieldErrors, this should go inside the form itself
          <ZodFieldErrors fieldErrors={zodError.fieldErrors} />
        ) : (
          `Error: ${err.message}`
        )
      );
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const name = _name.current.value;
    const personalEmail = _personalEmail.current.value;
    const usn = _usn.current.value;
    const values = { name, personalEmail, usn, gender, branch };
    editProfile.mutate(values);
  };

  return (
    <div className="max-w-xl pt-4 mx-auto">
      {isLoading ? (
        <Loader />
      ) : error instanceof Error ? (
        // TODO:3a8f839d-357b-441b-a4fc-6b1d83c31f30
        <span>Error</span>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            ref={_name}
            defaultValue={data?.name}
            name="name"
            id="name"
            label="Name"
          />
          <TextField
            ref={_usn}
            defaultValue={data?.usn ?? undefined}
            name="usn"
            id="usn"
            label="USN"
          />
          <TextField
            ref={_personalEmail}
            type="email"
            defaultValue={data?.personalEmail ?? undefined}
            name="personalEmail"
            id="personalEmail"
            required
            label="Personal Email"
          />
          <ListBox
            Label="Gender"
            selected={gender ?? data?.gender}
            setSelected={setGender}
            list={genders}
          />
          <ListBox
            Label="Branch"
            selected={branch ?? data?.branch}
            setSelected={setBranch}
            list={branches}
          />
          <ButtonGroup className="pt-2" align="end">
            <Button type="submit" loading={editProfile.isLoading}>
              Save Details
            </Button>
          </ButtonGroup>
        </form>
      )}
    </div>
  );
};
