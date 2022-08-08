export interface FileUploaderProps {
  accept: ".PNG,.JPEG" | ".PDF";
  label: string;
  fileName: string | null;
  id: string;
  onChange: (file: FileUploaderType | null) => void;
  required?: boolean;
  href?: string;
}

export interface FileUploaderType {
  name: string;
  file: FileType;
}
export type FileType = string | ArrayBuffer | undefined | null;
