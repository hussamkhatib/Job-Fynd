export default interface Props {
  selected: string | string[] | undefined;
  setSelected(value: unknown): void;
  multiple?: boolean;
  list: string[];
  Label: string;
}
