import NavTabs from "../../NavTabs";
import tabs from "./tabs";
import FileUploader from "../../FileUploader";

export const Resume = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
      <FileUploader type={"pdf"} id={"resume"} />
    </div>
  );
};
