import NavTabs from "../../NavTabs";
import tabs from "./eventTabs.store";

export const Active = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
    </div>
  );
};
