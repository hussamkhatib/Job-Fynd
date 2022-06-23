import classNames from "classnames";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
}

const alignments = {
  start: "justify-start",
  center: "w-full justify-center",
  end: "w-full justify-end",
};

const ButtonGroup: FC<Props> = ({ children, className, align = "start" }) => {
  const alignStyles = alignments[align];

  return (
    <div
      className={classNames("inline-flex space-x-4", alignStyles, className)}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
