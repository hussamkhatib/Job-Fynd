import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import tabs from "./tabs";
import { studentCols } from "../profile/data";

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
      <NavTabs tabs={tabs} />
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
