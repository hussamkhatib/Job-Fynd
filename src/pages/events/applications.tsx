import { useContext, useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { eventCols } from "../../store/events.data";
import user, { UserRole } from "../../userContext";

const Applications = () => {
  const userRole = useContext(user);
  const [data, setData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/student/1/event`);
      const json = await response.json();
      setData(json);
      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) return <div>Loading ...</div>;
  if (userRole === UserRole.admin) return null;

  return (
    <div>
      <NavTabs tabs={studentEventTabs} />
      <Table columns={eventCols} rowsCount={10} data={data} />
    </div>
  );
};

export default Applications;
