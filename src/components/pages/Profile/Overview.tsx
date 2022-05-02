import { useEffect, useState } from "react";
import NavTabs from "../../NavTabs";
import Table from "../../Table";
import tabs from "./profileTabs.store";

export const Overview = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [table, setTable] = useState({
    columns: {},
    data: {},
  });
  useEffect(() => {
    fetch("/student")
      .then((res) => res.json())
      .then((data) => {
        setTable(data);
        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded) return "Loading";
  return (
    <div>
      <NavTabs tabs={tabs} />
      <Table columns={table.columns} data={table.data} />
    </div>
  );
};