import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { adminEventCols, eventCols } from "../../store/events.data";
import { useContext } from "react";
import user, { UserRole } from "../../userContext";
import {
  adminEventTabs,
  studentEventTabs,
} from "../../components/NavTabs/tabs";

const Events = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const userRole = useContext(user);
  const tabs =
    userRole === UserRole.student ? studentEventTabs : adminEventTabs;
  const columns = UserRole.student ? eventCols : adminEventCols;

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
        columns={columns}
        data={data}
        isLoading={!isLoaded}
        rowsCount={10}
      />
    </div>
  );
};

export default Events;
