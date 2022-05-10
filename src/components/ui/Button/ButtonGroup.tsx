import React, { FC } from "react";

interface Props {
  children: any;
}

const ButtonGroup: FC<Props> = ({ children }) => {
  return <div className="inline-flex space-x-4">{children}</div>;
};

export default ButtonGroup;
