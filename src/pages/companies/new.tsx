import { FC, SyntheticEvent, useRef } from "react";
import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import TextField from "../../components/ui/TextField/TextField";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import AxiosErrorMsg from "../../components/AxiosErrorMsg";

const NewCompany: FC = () => {
  return (
    <div>
      <NavTabs tabs={companiesTabs} />
      <NewCompanyForm />
    </div>
  );
};

export default NewCompany;

const NewCompanyForm = () => {
  const router = useRouter();
  const _name = useRef<HTMLInputElement>(null!);
  const _sector = useRef<HTMLInputElement>(null!);

  const addNewCompany = useMutation(
    ({ name, sector }: { name: string; sector: string }) =>
      axios.post("/api/company", { name, sector }),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("New Company Created Successfully");
          router.push("/companies");
        }
        if (error instanceof Error)
          toast.error(<AxiosErrorMsg error={error as AxiosError} />);
      },
    }
  );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const name = _name.current.value;
    const sector = _sector.current.value;
    addNewCompany.mutate({
      name,
      sector,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        ref={_name}
        required
        id="name"
        type="text"
        name="name"
        label="Name"
      />

      <TextField
        ref={_sector}
        required
        id="sector"
        type="text"
        name="sector"
        label="Sector"
      />

      <ButtonGroup className="pt-4" align="end">
        {/* <Button>Cancel</Button> */}
        <Button type="submit" loading={addNewCompany.isLoading}>
          Create
        </Button>
      </ButtonGroup>
    </form>
  );
};
