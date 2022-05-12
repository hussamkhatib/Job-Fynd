import React from "react";
import FileUploader from "../../components/FileUploader";
import NavTabs from "../../components/NavTabs";
import tabs from "./tabs";
import data from "./data";

const Edit = () => {
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

export default Edit;
