import { Role, Validation } from "@prisma/client";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { toast } from "react-toastify";
import NavTabs from "../../../components/NavTabs";
import { studentsTabs } from "../../../components/NavTabs/tabs";
import StudentProfile from "../../../components/StudentProfile";
import Alert from "../../../components/ui/Alert";
import Button from "../../../components/ui/Button";
import ButtonGroup from "../../../components/ui/Button/ButtonGroup";
import Loader from "../../../components/ui/Loader";
import { trpc } from "../../../utils/trpc";
import Error from "next/error";

const StudentPage = () => {
  const utils = trpc.useContext();

  const router = useRouter();
  const { data: session } = useSession();
  if (session?.user.role === Role.student) return <Error statusCode={403} />;

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
        if (data) {
          utils.setQueryData(["admin.student.getByUsn", { usn }], data);
          toast.success(`Profiles were validated successfully`);
        }
        if (error instanceof Error) toast.error(`Error: ${error.message}`);
      },
    }
  );

  return (
    <div className="max-w-xl mx-auto">
      <NavTabs tabs={studentsTabs} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert>{error.message}</Alert>
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
          <StudentProfile studentRecord={data} />
        </Fragment>
      ) : null}
    </div>
  );
};

export default StudentPage;
