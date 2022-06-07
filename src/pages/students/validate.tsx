import NavTabs from "../../components/NavTabs";
import { studentsTabs } from "../../components/NavTabs/tabs";
import { studentCols } from "../../store/student.data";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Table from "../../components/Table";
import { Fragment } from "react";

const ValidateStudents = () => {
  return (
    <div>
      <NavTabs tabs={studentsTabs} />
      <ValidateStudentTable />
    </div>
  );
};

export default ValidateStudents;

const ValidateStudentTable = () => {
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery(
    ["validationPendingStduents"],
    fetchValidationPendingStudents
  );

  const { mutate: handleValdidation } = useMutation(
    ({ isValid, idList }: { isValid: boolean; idList: string[] }) =>
      axios.patch("/api/student/validation", { isValid, idList }),
    {
      onSettled: (data, error) => {
        if (data) {
          toast.success(
            `${data.data.count} Profiles were validated successfully`
          );
          queryClient.invalidateQueries("validationPendingStduents");
        }
        if (error instanceof Error) toast.error(`Error: ${error.message}`);
      },
    }
  );
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  if (Array.isArray(data) && !data.length) {
    return <h1>No pending validation left</h1>;
  }

  return (
    <Table columns={studentCols} data={data} isRowSelectable>
      <Table.Head>
        <Table.RowSelectionContainer className="align-end">
          {({ selection }: any) => {
            const total = selection.length;
            const ids = selection.map((row: any) => row.id);
            return (
              <Fragment>
                <Table.ActionButton
                  size="xs"
                  onClick={() =>
                    handleValdidation({ isValid: true, idList: ids })
                  }
                >
                  Accept {total} records
                </Table.ActionButton>
                <Table.ActionButton
                  size="xs"
                  onClick={() =>
                    handleValdidation({ isValid: true, idList: ids })
                  }
                >
                  Reject {total} records
                </Table.ActionButton>
              </Fragment>
            );
          }}
        </Table.RowSelectionContainer>
      </Table.Head>
    </Table>
  );
};

const fetchValidationPendingStudents = async () => {
  const { data } = await axios.get("/api/student/validation/pending");
  return data;
};
