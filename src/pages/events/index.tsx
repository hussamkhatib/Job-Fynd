import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { studentEventTabs, adminEventTabs } from "./events.data";
import { useContext } from "react";
import user, { UserRole } from "../../userContext";

const Events = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [table, setTable] = useState({
    columns: [],
    data: [],
  });
  const userRole = useContext(user);
  const tabs =
    userRole === UserRole.student ? studentEventTabs : adminEventTabs;

  useEffect(() => {
    fetch("/events")
      .then((res) => res.json())
      .then((data) => {
        setTable(data);
        setIsLoaded(true);
      });
  }, []);

  return (
    <div>
      <NavTabs tabs={tabs} />
      <Table
        columns={table.columns}
        data={table.data}
        isLoading={!isLoaded}
        rowsCount={10}
      />
    </div>
  );
};

export default Events;
