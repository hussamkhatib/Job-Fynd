import React from "react";
import NavTabs from "../../NavTabs";
import Table from "../../Table";
import tabs from "./tabs";
import data from "./data";

export const Overview = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
      <Table columns={data.columns} data={data.data} rowsCount={1} />
    </div>
  );
};
