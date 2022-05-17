import NavTabs from "../../components/NavTabs";
import { adminEventTabs } from "../../components/NavTabs/tabs";

const NewEvent = () => {
  return (
    <div>
      <NavTabs tabs={adminEventTabs} />
      <form></form>
    </div>
  );
};

export default NewEvent;
