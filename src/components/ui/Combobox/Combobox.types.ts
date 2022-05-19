import { SetStateAction } from "react";

export interface Item {
  id: number;
  name: string;
}
export default interface Props {
  selected: Item | undefined;
  setSelected(value: unknown): void;
  Label: string;
  getFilteredList(query: string): SetStateAction<Item[]>;
}
