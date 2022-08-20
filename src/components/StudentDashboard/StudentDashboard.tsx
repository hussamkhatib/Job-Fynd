import { Validation } from "@prisma/client";
import { FC } from "react";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import StudentProfile from "../StudentProfile";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import ButtonGroup from "../ui/Button/ButtonGroup";
import Loader from "../ui/Loader";

const StudentDashboard: FC = () => {
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

  if (error) return <Alert>{error.message}</Alert>;
  return (
    <div className="max-w-xl mx-auto">
      {isLoading ? (
        <Loader />
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

export default StudentDashboard;
