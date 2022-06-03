import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { eventCols } from "../../store/events.data";

const Applications = () => {
  const { data: session }: { data: any } = useSession();
  if (session?.user.role === Role.admin) return null;
  return (
    <div>
      <NavTabs tabs={studentEventTabs} />
      <StudentApplications />
    </div>
  );
};

export default Applications;

const StudentApplications = () => {
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
  }, [usn]);
  if (!isLoaded) return <div>Loading ...</div>;
  if (Array.isArray(data) && !data.length)
    return <span>You have not applied to any events yet.</span>;
  return <Table columns={eventCols} rowsCount={10} data={data} />;
};
