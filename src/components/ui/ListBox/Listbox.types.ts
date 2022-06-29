interface Item {
  id: string;
  name: string;
}

export default interface Props {
  selected: string[] | string | Item | Item[] | undefined;
  setSelected(value: unknown): void;
  multiple?: boolean;
  list: string[] | Item[];
  Label: string;
}
