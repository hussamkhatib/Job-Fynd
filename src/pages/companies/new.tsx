import { FC } from "react";
import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";

const NewCompany: FC = () => {
  return (
    <div>
      <NavTabs tabs={companiesTabs} />
    </div>
  );
};

export default NewCompany;
