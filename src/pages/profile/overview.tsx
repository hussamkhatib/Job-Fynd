import { Validation } from "@prisma/client";
import { toast } from "react-toastify";
import NavTabs from "../../components/NavTabs";
import { profileTabs } from "../../components/NavTabs/tabs";
import StudentProfile from "../../components/StudentProfile";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
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
  const utils = trpc.useContext();

  const { data, error, isLoading } = trpc.useQuery(["users.me"], {
    select: (data) => data?.studentRecord,
  });

  const requestForValidation = trpc.useMutation(
    ["users.me.requestForValidation"],
    {
      onSuccess: () => {
        toast.success("Profile sent for Validation");
        utils.invalidateQueries(["users.me"]);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  return (
    <div className="max-w-xl mx-auto">
      {isLoading ? (
        <Loader />
      ) : error instanceof Error ? (
        // TODO:3a8f839d-357b-441b-a4fc-6b1d83c31f30
        <span>Error</span>
      ) : (
        <div>
          {data?.validated === Validation.notvalidated && (
            <ButtonGroup align="end">
              <Button
                loading={requestForValidation.isLoading}
                onClick={() => requestForValidation.mutate()}
              >
                Request for Validation
              </Button>
            </ButtonGroup>
          )}
          <StudentProfile studentRecord={data} />
        </div>
      )}
    </div>
  );
};
