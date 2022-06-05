import { Fragment } from "react";
import NavTabs from "../../components/NavTabs";
import { studentsTabs } from "../../components/NavTabs/tabs";
import SelectionRowTable from "../../components/SelectionRowTable";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import { studentCols } from "../../store/student.data";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
      onSuccess: () => {
        queryClient.invalidateQueries("validationPendingStduents");
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
    return (
      <Fragment>
        <NavTabs tabs={studentsTabs} />
        <h1>No pending validation left</h1>
      </Fragment>
    );
  }
  return (
    <SelectionRowTable columns={studentCols} data={data} isLoading={isLoading}>
      {({ selectedFlatRows }: any) => {
        const total = selectedFlatRows.length;
        const ids = selectedFlatRows.map((row: any) => row.id);
        return (
          <div className="flex items-center justify-between">
            <h1>
              <span className="font-semibold">{data.length}</span> Pending
              Records left
            </h1>
            {total ? (
              <ButtonGroup className="w-max">
                <Button
                  onClick={() =>
                    handleValdidation({ isValid: true, idList: ids })
                  }
                >
                  Accept {total} records
                </Button>
                <Button
                  onClick={() =>
                    handleValdidation({ isValid: false, idList: ids })
                  }
                  variant="danger"
                >
                  Reject {total} records
                </Button>
              </ButtonGroup>
            ) : null}
          </div>
        );
      }}
    </SelectionRowTable>
  );
};

const fetchValidationPendingStudents = async () => {
  const { data } = await axios.get("/api/student/validation/pending");
  return data;
};
