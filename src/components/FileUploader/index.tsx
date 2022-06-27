import { DocumentIcon } from "@heroicons/react/outline";
import { ChangeEvent, FC, useRef } from "react";
import Button from "../ui/Button";

interface Props {
  accept: ".png,.jpeg" | ".pdf";
  fileName: string | null;
  onChange: (file: File | null) => void;
  onRemove: () => void;
  id: string;
  label: string;
}

const FileUploader: FC<Props> = ({
  accept,
  fileName,
  onChange,
  onRemove,
  id,
  label,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    const file = event.target.files[0];
    onChange(file);
  };

  const handleOnRemove = () => {
    if (inputRef.current) inputRef.current.value = "";
    onRemove();
  };

  return (
    <div className="flex justify-between p-3 border-2">
      <div className="flex items-center space-x-2">
        <DocumentIcon className="w-10 h-10" aria-hidden="true" />
        <p>{fileName || `Supported file types are ${accept}`}</p>
      </div>
      <div className="flex items-center space-x-2">
        <label
          htmlFor={id}
          className="relative flex flex-col items-center justify-center h-full border-dashed cursor-pointer"
        >
          <span>{label}</span>

          <input
            ref={inputRef}
            onChange={handleOnChange}
            className="hidden w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            id={id}
            accept={accept}
            type="file"
            required
            autoComplete="off"
            // tabIndex="-1"
          />
        </label>
        {fileName && (
          <Button onClick={() => handleOnRemove()} size="sm">
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
