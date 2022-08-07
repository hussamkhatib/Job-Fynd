import NavTabs from "../../components/NavTabs";
import { profileTabs } from "../../components/NavTabs/tabs";
import StudentProfile from "../../components/StudentProfile";
import Loader from "../../components/ui/Loader";
import { trpc } from "../../utils/trpc";

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
  const { data, error, isLoading } = trpc.useQuery(["users.me"], {
    select: (data) => data?.studentRecord,
  });

  return (
    <div className="max-w-xl mx-auto">
      {isLoading ? (
        <Loader />
      ) : error instanceof Error ? (
        // TODO:3a8f839d-357b-441b-a4fc-6b1d83c31f30
        <span>Error</span>
      ) : (
        <StudentProfile studentRecord={data} />
      )}
    </div>
  );
};
