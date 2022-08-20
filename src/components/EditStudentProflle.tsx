import { Branch, Gender } from "@prisma/client";
import { useRouter } from "next/router";
import { useRef, useState, SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { genders, branches } from "../store/student.data";
import { trpc } from "../utils/trpc";
import Alert from "./ui/Alert";
import Button from "./ui/Button";
import ButtonGroup from "./ui/Button/ButtonGroup";
import ListBox from "./ui/ListBox";
import Loader from "./ui/Loader";
import TextField from "./ui/TextField";
import ZodFieldErrors from "./ZodFieldErrors";

const EditStudentProfile = () => {
  const router = useRouter();
  const _name = useRef<HTMLInputElement>(null!);
  const _usn = useRef<HTMLInputElement>(null!);
  const _personalEmail = useRef<HTMLInputElement>(null!);
  const [branch, setBranch] = useState<Branch>();
  const [gender, setGender] = useState<Gender>();

  const { data, error, isLoading } = trpc.useQuery(["users.me"], {
    select: (data) => data?.studentRecord ?? null,
  });
  const editProfile = trpc.useMutation(["users.me.update.profile"], {
    onSuccess: () => {
      toast.success("Profile Updated");
      router.push("/dashboard");
    },
    onError: (err) => {
      const zodError = err.data?.zodError;
      toast.error(
        zodError?.fieldErrors ? (
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

    if (!branch) return toast.error("Please select your Branch");
    if (!gender) return toast.error("Please select your Gender");

    const values = { name, personalEmail, usn, gender, branch, id: data?.id };
    editProfile.mutate(values);
  };

  return (
    <div className="max-w-xl pt-4 mx-auto">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert>{error.message}</Alert>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            ref={_name}
            defaultValue={data?.name}
            name="name"
            id="name"
            label="Name"
            required
          />
          <TextField
            ref={_usn}
            defaultValue={data?.usn ?? undefined}
            name="usn"
            id="usn"
            label="USN"
            required
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

export default EditStudentProfile;
