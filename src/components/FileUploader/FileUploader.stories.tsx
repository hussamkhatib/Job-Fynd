import { useState } from "react";
import FileUploader from ".";

export default {
  title: "FileUploader",
  component: FileUploader,
};

export const UploadImage = () => {
  const [file, setFile] = useState<any>("");

  const handleOnChange = (file: any) => {
    setFile(file);
  };
  const handleOnRemove = () => {
    setFile(null);
  };

  return (
    <FileUploader
      fileName={file?.name}
      accept=".png,.jpeg"
      onChange={handleOnChange}
      onRemove={handleOnRemove}
      id="avatar"
      Label="Choose a profile picture"
    />
  );
};
