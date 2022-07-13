import NavTabs from "../../components/NavTabs";
import { profileTabs } from "../../components/NavTabs/tabs";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import StudentProfile from "../../components/StudentProfile";
import AxiosErrorMsg from "../../components/AxiosErrorMsg";

const Overview = () => {
  return (
    <div>
      <NavTabs tabs={profileTabs} />
      <StudentOverviewTable />
    </div>
  );
};

export default Overview;

const StudentOverviewTable = () => {
  const { isLoading, data, error } = useQuery(
    ["studentProfile", "?profile=full"],
    fetchStudentProfile
  );

  return data ? (
    <div className="max-w-xl mx-auto">
      {isLoading ? (
        <span>Loading...</span>
      ) : error instanceof Error ? (
        <AxiosErrorMsg error={error as AxiosError} />
      ) : (
        <StudentProfile details={data} />
      )}
    </div>
  ) : null;
};

const fetchStudentProfile = async () => {
  const { data } = await axios.get(`/api/me?profile=full`);
  return data;
};
