import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { eventCols } from "../../store/events.data";

const Applications = () => {
  const { data: session }: { data: any } = useSession();
  const { usn } = session.user;
  const [data, setData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/student/${usn}/applications`);
      const json = await response.json();
      setData(json);
      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) return <div>Loading ...</div>;
  if (session?.user.role === Role.admin) return null;

  return (
    <div>
      <NavTabs tabs={studentEventTabs} />
      <Table columns={eventCols} rowsCount={10} data={data} />
    </div>
  );
};

export default Applications;
