import NavTabs from "../../NavTabs";
import tabs from "./profileTabs.store";

export const Profile = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
    </div>
  );
};