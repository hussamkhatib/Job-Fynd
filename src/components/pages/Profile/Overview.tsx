import NavTabs from "../../NavTabs";
import tabs from "./profileTabs.store";

export const Overview = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
    </div>
  );
};
