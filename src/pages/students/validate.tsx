import NavTabs from "../../components/NavTabs";
import { studentsTabs } from "../../components/NavTabs/tabs";

const ValidateStudents = () => {
  return (
    <div>
      <NavTabs tabs={studentsTabs} />
    </div>
  );
};

export default ValidateStudents;
