import NavTabs from "../../components/NavTabs";
import tabs from "./tabs";
import FileUploader from "../../components/FileUploader";

const Resume = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
      <FileUploader type={"pdf"} id={"resume"} />
    </div>
  );
};

export default Resume;
