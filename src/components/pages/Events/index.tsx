import NavTabs from "../../NavTabs";
import tabs from "./eventTabs.store";

export const Events = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
    </div>
  );
};
