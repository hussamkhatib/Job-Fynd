import NavTabs from "../../NavTabs";
import tabs from "./profileTabs.store";

export const Resume = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
    </div>
  );
};
