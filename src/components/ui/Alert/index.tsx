import classNames from "classnames";
import { FC } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";

const alert = {
  info: "bg-blue-500",
  warning: "bg-yellow-500",
  success: "bg-green-500 ",
  error: "bg-red-500 ",
};

const icon = {
  info: (
    <InformationCircleIcon
      role="presentation"
      className="w-5 h-5 mr-3 bg-blue-500"
    />
  ),
  warning: (
    <ExclamationIcon
      role="presentation"
      className="w-5 h-5 mr-3 bg-yellow-500"
    />
  ),
  success: (
    <CheckCircleIcon
      role="presentation"
      className="w-5 h-5 mr-3 bg-green-500"
    />
  ),
  error: (
    <ExclamationCircleIcon
      role="presentation"
      className="w-5 h-5 mr-3 bg-red-500"
    />
  ),
};
interface Props {
  children: any;
  status: "info" | "warning" | "success" | "error";
}

const Alert: FC<Props> = ({ children, status = "error" }) => {
  const statusStyle = alert[status];
  return (
    <div
      role="alert"
      className={classNames(
        statusStyle,
        "text-white flex items-center justify-center px-4 py-3 font-semibold"
      )}
    >
      {icon[status]}
      {children}
    </div>
  );
};

export default Alert;
