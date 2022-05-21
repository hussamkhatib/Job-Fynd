import { FC } from "react";
import Cell from ".";

interface Props {
  values: string[];
}

const CellList: FC<Props> = ({ values }) => {
  return (
    <div className="flex items-center space-x-2">
      {values.map((value) => (
        <Cell key={value}>{value}</Cell>
      ))}
    </div>
  );
};

export default CellList;
