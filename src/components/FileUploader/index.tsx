import { DocumentIcon } from "@heroicons/react/outline";
import { ChangeEvent, FC, useRef } from "react";
import Button from "../ui/Button";
import type { FileUploaderProps } from "./FileUploader.types";

const FileUploader: FC<FileUploaderProps> = ({
  accept,
  fileName,
  onChange,
  id,
  label,
}) => {
  const _file = useRef<HTMLInputElement>(null!);

  const handleOnChange = (event?: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) {
      _file.current.value = "";
      return onChange(null);
    }
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        onChange({
          name: file.name,
          file: Reader.result,
        });
      }
    };
  };

  return (
    <div className="flex justify-between p-3 space-x-2 border-2">
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
            onChange={handleOnChange}
            className="hidden w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            id={id}
            accept={accept}
            type="file"
            required
            autoComplete="off"
            ref={_file}
            // tabIndex="-1"
          />
        </label>
        {fileName && (
          <Button type="button" onClick={() => handleOnChange()} size="sm">
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};
export default FileUploader;
