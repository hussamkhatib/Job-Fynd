import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { eventCols } from "../../store/events.data";

const MyEvents = () => {
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
  return (
    <div>
      <Table columns={eventCols} rowsCount={10} data={data} />
    </div>
  );
};

export default MyEvents;
