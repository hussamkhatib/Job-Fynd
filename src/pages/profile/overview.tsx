import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import tabs from "./tabs";
import { studentCols } from "./data";

const Overview = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/student/1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
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
        data={data}
        isLoading={!isLoaded}
        rowsCount={1}
      />
    </div>
  );
};

export default Overview;
