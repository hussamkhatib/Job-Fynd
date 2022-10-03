import EditStudentProfile from "../../components/EditStudentProfile";
import NavTabs from "../../components/NavTabs";
import { profileTabs } from "../../components/NavTabs/tabs";

const Edit = () => {
  return (
    <div>
      <NavTabs tabs={profileTabs} />
      <EditStudentProfile />
    </div>
  );
};

export default Edit;
