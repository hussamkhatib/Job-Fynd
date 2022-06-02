import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { studentCols } from "../../store/student.data";
import { profileTabs } from "../../components/NavTabs/tabs";
import { useSession } from "next-auth/react";

const Overview = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<any>([]);
  const { data: session }: { data: any } = useSession();
  const { usn } = session.user;

  useEffect(() => {
    fetch(`/api/student/${usn}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setData([data]);
        setIsLoaded(true);
      });
  }, [usn]);
  if (!isLoaded) return <span>Loading...</span>;

  return (
    <div>
      <NavTabs tabs={profileTabs} />
      <Table columns={studentCols} data={data} rowsCount={1} />
    </div>
  );
};

export default Overview;
