import React from "react";
import FileUploader from "../../components/FileUploader";
import NavTabs from "../../components/NavTabs";
import data from "../../store/records.data";
import { recordsTabs } from "../../components/NavTabs/tabs";

const Edit = () => {
  return (
    <div>
      <NavTabs tabs={recordsTabs} />
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
