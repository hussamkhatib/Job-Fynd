import NavTabs from "../../NavTabs";
import tabs from "./eventTabs.store";

export const All = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
    </div>
  );
};
