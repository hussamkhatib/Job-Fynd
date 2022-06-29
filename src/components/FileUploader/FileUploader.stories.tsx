import { useState } from "react";
import FileUploader from ".";

export default {
  title: "FileUploader",
  component: FileUploader,
};

export const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleOnChange = (file: File | null) => setFile(file ?? null);

  return (
    <FileUploader
      fileName={file && file?.name}
      accept=".png,.jpeg"
      onChange={handleOnChange}
      id="avatar"
      label="Choose a profile picture"
    />
  );
};
