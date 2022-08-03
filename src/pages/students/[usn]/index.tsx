import { Role, Validation } from "@prisma/client";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { toast } from "react-toastify";
import StudentProfile from "../../../components/StudentProfile";
import Button from "../../../components/ui/Button";
import ButtonGroup from "../../../components/ui/Button/ButtonGroup";
import Loader from "../../../components/ui/Loader";
import { trpc } from "../../../utils/trpc";

const StudentPage = () => {
  const utils = trpc.useContext();

  const router = useRouter();
  const { data: session } = useSession();
  const { usn } = router.query as any;

  const { isLoading, data, error } = trpc.useQuery([
    "admin.student.getByUsn",
    {
      usn,
    },
  ]);

  const handleValdidation = trpc.useMutation(
    ["admin.student.updateValidation"],
    {
      onSettled: (data, error) => {
        console.log({ data, error });
        if (data) {
          utils.setQueryData(["admin.student.getByUsn", { usn }], data);
          toast.success(`Profiles were validated successfully`);
        }
        if (error instanceof Error) toast.error(`Error: ${error.message}`);
      },
    }
  );

  if (session?.user.role === Role.student)
    return <p>You are not allowed to view this page</p>;

  return (
    <div className="max-w-xl mx-auto">
      {isLoading ? (
        <Loader />
      ) : error instanceof Error ? (
        <p> Error</p>
      ) : data ? (
        <Fragment>
          <div className="min-h-[50px] flex justify-end items-center">
            {data.validated === Validation.pending ? (
              <ButtonGroup align="end">
                <Button
                  onClick={() =>
                    handleValdidation.mutate({
                      usn,
                      validated: Validation.validated,
                    })
                  }
                  loading={handleValdidation.isLoading}
                >
                  Accept
                </Button>
                <Button
                  color="secondary"
                  onClick={() =>
                    handleValdidation.mutate({
                      usn,
                      validated: Validation.notvalidated,
                    })
                  }
                  loading={handleValdidation.isLoading}
                >
                  Reject
                </Button>
              </ButtonGroup>
            ) : (
              <div>
                Status:{" "}
                <span
                  className={classNames(
                    data.validated === Validation.validated
                      ? "text-green-600"
                      : "text-red-600"
                  )}
                >
                  {data.validated === Validation.validated
                    ? "Validated"
                    : "Not Validated"}
                </span>
              </div>
            )}
          </div>
          <StudentProfile details={data} />
        </Fragment>
      ) : null}
    </div>
  );
};

export default StudentPage;
