import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ButtonGroup: FC<Props> = ({ children }) => {
  return <div className="inline-flex space-x-4">{children}</div>;
};

export default ButtonGroup;
