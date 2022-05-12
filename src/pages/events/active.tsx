import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { eventTabs } from "./events.data";

const Active = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [table, setTable] = useState({
    columns: [],
    data: [],
  });
  useEffect(() => {
    fetch("/activeevents")
      .then((res) => res.json())
      .then((data) => {
        setTable(data);
        setIsLoaded(true);
      });
  }, []);
  return (
    <div>
      <NavTabs tabs={eventTabs} />
      <Table
        columns={table.columns}
        data={table.data}
        isLoading={!isLoaded}
        rowsCount={10}
      />
    </div>
  );
};

export default Active;
