import NavTabs from "../../NavTabs";
import { eventTabs } from "./events.data";

export const Active = () => {
  return (
    <div>
      <NavTabs tabs={eventTabs} />
    </div>
  );
};
