import NavTabs from "../../components/NavTabs";
import FileUploader from "../../components/FileUploader";
import { profileTabs } from "../../components/NavTabs/tabs";

const Resume = () => {
  return (
    <div>
      <NavTabs tabs={profileTabs} />
      <FileUploader type={"pdf"} id={"resume"} />
    </div>
  );
};

export default Resume;
