import { DocumentIcon } from "@heroicons/react/outline";
import { FC, useState } from "react";
import Button from "../ui/Button";

interface Props {
  type: "img" | "pdf";
  id: string;
}

const FileUploader: FC<Props> = ({ type, id }) => {
  const accept = type === "img" ? ".png,.jpeg" : ".pdf";

  const [selectedFile, setSelectedFile] = useState<any>();

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div className="border-2 ">
      <div className="max-w-xl mx-auto">
        {selectedFile && (
          <div>
            <h2>{selectedFile.name}</h2>
            <div>
              <a className="text-[#0a6cff]" href="./resume">
                view your {id}
              </a>{" "}
              or uplaod a new one below
            </div>
          </div>
        )}

        <form>
          <label
            htmlFor={id}
            className="relative flex flex-col items-center justify-center h-full p-4 border-dashed cursor-pointer"
          >
            <DocumentIcon className="w-10 h-10" aria-hidden="true" />
            <span className="text-[#0a6cff]">upload new file</span>
            <input
              onChange={changeHandler}
              className="hidden"
              id={id}
              accept={accept}
              type="file"
              // autoComplete="off"
              // tabIndex="-1"
            />
          </label>
        </form>
        {selectedFile && (
          <Button
            size="sm"
            type="button"
            onClick={() => setSelectedFile(null)}
            variant="text"
          >
            Remove your {id}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
