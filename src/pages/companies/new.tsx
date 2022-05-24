import { FC, SyntheticEvent, useRef } from "react";
import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Input from "../../components/ui/Input";
import { useRouter } from "next/router";

const NewCompany: FC = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const sectorRef = useRef<HTMLInputElement | null>(null);
  const logoRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        name: nameRef.current?.value,
        sector: sectorRef.current?.value,
        logo: logoRef.current?.value,
      };
      await fetch("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/companies");
    } catch (error) {
      console.error(error);
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
        <div className="flex flex-col">
          <label htmlFor="logo">
            <span className="label-text">Logo</span>
          </label>
          <Input ref={logoRef} required id="logo" type="text" name="logo" />
        </div>
        <ButtonGroup className="pt-4" align="end">
          {/* <Button>Cancel</Button> */}
          <Button type="submit">Save</Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default NewCompany;
