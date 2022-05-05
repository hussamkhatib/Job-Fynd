import React from "react";
import FileUploader from "../../FileUploader";
import NavTabs from "../../NavTabs";
import tabs from "./tabs";
import data from "./data";

export const Edit = () => {
  return (
    <div>
      <NavTabs tabs={tabs} />
      {data.columns.map((d) => (
        <div key={d.accessor}>
          <p>{d.Header}</p>
          <FileUploader type={"img"} id={`${d.Header} result`} />
        </div>
      ))}
    </div>
  );
};
