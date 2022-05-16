import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { studentEventTabs, adminEventTabs, eventCols } from "./events.data";
import { useContext } from "react";
import user, { UserRole } from "../../userContext";

const Events = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const userRole = useContext(user);
  const tabs =
    userRole === UserRole.student ? studentEventTabs : adminEventTabs;

  useEffect(() => {
    fetch("/api/event")
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
        columns={eventCols}
        data={data}
        isLoading={!isLoaded}
        rowsCount={10}
      />
    </div>
  );
};

export default Events;
