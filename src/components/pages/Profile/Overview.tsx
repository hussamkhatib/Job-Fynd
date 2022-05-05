import { useEffect, useState } from "react";
import NavTabs from "../../NavTabs";
import Table from "../../Table";
import tabs from "./tabs";

export const Overview = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [table, setTable] = useState({
    columns: [],
    data: [],
  });

  useEffect(() => {
    fetch("/student")
      .then((res) => res.json())
      .then((data) => {
        setTable(data);
        setIsLoaded(true);
      });
  }, []);

  return (
    <div>
      <NavTabs tabs={tabs} />
      <Table columns={table.columns} data={table.data} isLoading={!isLoaded} />
    </div>
  );
};
