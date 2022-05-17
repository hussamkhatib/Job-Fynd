import { InputHTMLAttributes } from "react";

export type InputRef = React.ForwardedRef<HTMLInputElement>;

export default interface Props extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}
