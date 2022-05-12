import React from "react";
import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import tabs from "./tabs";
import data from "./data";

const Overview = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
      <Table columns={data.columns} data={data.data} rowsCount={1} />
    </div>
  );
};

export default Overview;
