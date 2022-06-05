interface Item {
  id: string;
  name: string;
}

export default interface Props {
  selected: string | Item;
  setSelected(value: unknown): void;
  multiple?: boolean;
  list: string[] | Item[];
  Label: string;
}
