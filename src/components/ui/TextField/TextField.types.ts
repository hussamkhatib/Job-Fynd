export type TextFieldRef = HTMLInputElement;

export default interface Props {
  id: string;
  label: string;
  type?: string;
  fullWidth?: boolean;
  className?: string;
  required?: boolean;
  name: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: string;
}
