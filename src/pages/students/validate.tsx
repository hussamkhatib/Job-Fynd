import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import { studentsTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
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

  return (
    <div>
      <NavTabs tabs={studentsTabs} />
      <Table
        columns={studentCols}
        rowsCount={10}
        data={data}
        isLoading={!isLoaded}
      />
    </div>
  );
};

export default ValidateStudents;
