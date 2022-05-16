import NavTabs from "../../components/NavTabs";
import { adminEventTabs } from "./events.data";

const NewEvent = () => {
  return (
    <div>
      <NavTabs tabs={adminEventTabs} />
      <form></form>
    </div>
  );
};

export default NewEvent;
