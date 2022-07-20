export interface FileUploaderProps {
  accept: ".png,.jpeg" | ".pdf";
  fileName: string | null;
  onChange: (file: FileUploaderType | null) => void;
  id: string;
  label: string;
}

export interface FileUploaderType {
  name: string;
  file: FileType;
}
export type FileType = string | ArrayBuffer | undefined | null;
