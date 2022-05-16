import { FC } from "react";
import Cell from ".";

interface Props {
  arr: string[];
}

const CellList: FC<Props> = ({ arr }) => {
  return (
    <div className="flex items-center space-x-2">
      {arr.map((item) => (
        <Cell key={item}>{item}</Cell>
      ))}
    </div>
  );
};

export default CellList;
