import React from "react";
import NavTabs from "../../NavTabs";
import tabs from "./recordTabs.data";

export const Edit = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
    </div>
  );
};
