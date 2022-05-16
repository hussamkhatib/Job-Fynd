import React from "react";
import NavTabs from "../../components/NavTabs";
import Table from "../../components/Table";
import { recordsTabs } from "../../components/NavTabs/tabs";
import data from "../../store/records.data";

const Overview = () => {
  return (
    <div>
      <NavTabs tabs={recordsTabs} />
      <Table columns={data.columns} data={data.data} rowsCount={1} />
    </div>
  );
};

export default Overview;
