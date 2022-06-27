import { FC, SyntheticEvent, useRef } from "react";
import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import TextField from "../../components/ui/TextField/TextField";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

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
  const nameRef = useRef<HTMLInputElement | null>(null);
  const sectorRef = useRef<HTMLInputElement | null>(null);

  const { mutate: addNewCompany } = useMutation(
    ({ name, sector }: { name: string; sector: string }) =>
      axios.post("/api/company", { name, sector }),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success("New Company Created Successfully");
          router.push("/companies");
        }
        if (error instanceof Error) toast.error(`Errror ! ${error.message}`);
      },
    }
  );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const sector = sectorRef.current?.value;
    if (name && sector) {
      addNewCompany({
        name,
        sector,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="name">
          <span className="label-text">Name</span>
        </label>
        <TextField
          ref={nameRef}
          required
          id="name"
          type="text"
          name="name"
          label="Name"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="sector">
          <span className="label-text">Sector</span>
        </label>
        <TextField
          ref={sectorRef}
          required
          id="sector"
          type="text"
          name="sector"
          label="Sector"
        />
      </div>

      <ButtonGroup className="pt-4" align="end">
        {/* <Button>Cancel</Button> */}
        <Button type="submit">Create</Button>
      </ButtonGroup>
    </form>
  );
};
