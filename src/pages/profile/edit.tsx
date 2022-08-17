import EditStudentProfile from "../../components/EditStudentProflle";
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
