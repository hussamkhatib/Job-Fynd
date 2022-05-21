import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { studentCols } from "../../store/student.data";
import { studentsTabs } from "../../components/NavTabs/tabs";

const Students = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/student")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
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

export default Students;
