import NavTabs from "../../NavTabs";
import { eventTabs } from "./events.data";

export const Events = () => {
  return (
    <div>
      <NavTabs tabs={eventTabs} />
    </div>
  );
};
