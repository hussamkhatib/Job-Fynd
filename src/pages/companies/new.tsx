import { FC, SyntheticEvent, useRef } from "react";
import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Input from "../../components/ui/Input";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import axios from "axios";

const NewCompany: FC = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const sectorRef = useRef<HTMLInputElement | null>(null);

  const { mutate: addNewCompany } = useMutation(
    ({ name, sector }: { name: string; sector: string }) =>
      axios.post("/api/company", { name, sector })
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
      await router.push("/companies");
    }
  };

  return (
    <div>
      <NavTabs tabs={companiesTabs} />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name">
            <span className="label-text">Name</span>
          </label>
          <Input ref={nameRef} required id="name" type="text" name="name" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="sector">
            <span className="label-text">Sector</span>
          </label>
          <Input
            ref={sectorRef}
            required
            id="sector"
            type="text"
            name="sector"
          />
        </div>

        <ButtonGroup className="pt-4" align="end">
          {/* <Button>Cancel</Button> */}
          <Button type="submit">Create</Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default NewCompany;
