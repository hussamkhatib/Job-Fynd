import { useState } from "react";
import FileUploader from ".";
import { FileUploaderType } from "./FileUploader.types";

export default {
  title: "FileUploader",
  component: FileUploader,
};

export const UploadImage = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const handleOnChange = (file: FileUploaderType | null) =>
    setFileName(file?.name ?? null);

  return (
    <FileUploader
      fileName={fileName}
      accept=".png,.jpeg"
      onChange={handleOnChange}
      id="avatar"
      label="Choose a profile picture"
    />
  );
};
