import React from "react";
import NavTabs from "../../NavTabs";
import tabs from "./recordTabs.data";

export const Overview = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
    </div>
  );
};
