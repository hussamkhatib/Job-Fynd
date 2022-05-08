import FileUploader from ".";

export default {
  title: "FileUploader",
  component: FileUploader,
};

export const UploadImage = () => (
  <FileUploader type={"img"} id={"1 sem result"} />
);
export const UploadPdf = () => <FileUploader type={"pdf"} id={"resume"} />;
