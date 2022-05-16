import NavTabs from "../../components/NavTabs";
import { adminEventTabs } from "../../store/events.data";

const NewEvent = () => {
  return (
    <div>
      <NavTabs tabs={adminEventTabs} />
      <form></form>
    </div>
  );
};

export default NewEvent;
