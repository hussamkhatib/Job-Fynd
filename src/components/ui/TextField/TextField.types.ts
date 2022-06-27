import { ChangeEvent } from "react";

export type TextFieldRef = HTMLInputElement;

export default interface Props {
  id: string;
  label: string;
  type?: string;
  fullWidth?: boolean;
  className?: string;
  required?: boolean;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
}
