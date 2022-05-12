import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import tabs from "./tabs";
import companyCols from "./data";

const Companies = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/company")
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
        columns={companyCols}
        isLoading={!isLoaded}
        rowsCount={10}
        data={data}
      />
    </div>
  );
};

export default Companies;
