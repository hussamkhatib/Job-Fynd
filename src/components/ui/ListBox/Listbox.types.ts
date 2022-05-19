export default interface Props {
  selected: string | string[];
  setSelected(value: unknown): void;
  multiple?: boolean;
  list: string[];
  Label: string;
}
