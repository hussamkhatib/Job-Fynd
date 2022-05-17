import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import companyCols from "../../store/company.data";

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
      <NavTabs tabs={companiesTabs} />
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
