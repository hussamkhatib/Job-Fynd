import { Fragment, useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import { studentsTabs } from "../../components/NavTabs/tabs";
import SelectionRowTable from "../../components/SelectionRowTable";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import { studentCols } from "../../store/student.data";

const ValidateStudents = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    let res;
    fetch("/api/student/validation/pending")
      .then((res) => res.json())
      .then((data) => {
        res = [...data];
        setData(res);
        setIsLoaded(true);
      });
  }, []);

  if (Array.isArray(data) && !data.length) {
    return (
      <Fragment>
        <NavTabs tabs={studentsTabs} />
        <h1>No pending validation left</h1>
      </Fragment>
    );
  }

  const handleValdidation = async (isValid: boolean, idList: string[]) => {
    const body = {
      isValid,
      idList,
    };
    await fetch(`/api/student/validation`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let res;
    setIsLoaded(false);
    await fetch("/api/student/validation/pending")
      .then((res) => res.json())
      .then((data) => {
        res = [...data];
        setData(res);
        setIsLoaded(true);
      });
  };

  return (
    <div>
      <NavTabs tabs={studentsTabs} />
      <SelectionRowTable
        columns={studentCols}
        data={data}
        isLoading={!isLoaded}
      >
        {({ selectedFlatRows }: any) => {
          const total = selectedFlatRows.length;
          const ids = selectedFlatRows.map((row: any) => row.values.id);
          return (
            <div className="flex items-center justify-between">
              <h1>
                <span className="font-semibold">{data.length}</span> Pending
                Records left
              </h1>
              {total ? (
                <ButtonGroup className="w-max">
                  <Button onClick={() => handleValdidation(true, ids)}>
                    Accept {total} records
                  </Button>
                  <Button
                    onClick={() => handleValdidation(false, ids)}
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
    </div>
  );
};

export default ValidateStudents;
