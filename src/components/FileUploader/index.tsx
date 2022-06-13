import { DocumentIcon } from "@heroicons/react/outline";
import { ChangeEvent, FC, useRef } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface Props {
  accept: ".png,.jpeg" | ".pdf";
  fileName: string;
  onChange: (file: any) => void;
  onRemove: () => void;
  id: string;
  Label: string;
}

const FileUploader: FC<Props> = ({
  accept,
  fileName,
  onChange,
  onRemove,
  id,
  Label,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
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
          <span>{Label}</span>

          <Input
            ref={inputRef}
            onChange={handleOnChange}
            className="hidden"
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
