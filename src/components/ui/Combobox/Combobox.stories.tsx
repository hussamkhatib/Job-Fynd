import { ComponentMeta } from "@storybook/react";
import { useState } from "react";
import Combobox from ".";
import { Item } from "./Combobox.types";

export default {
  title: "ui/Combobox",
  component: Combobox,
} as ComponentMeta<typeof Combobox>;

const list = [
  {
    id: 1,
    name: "CSE",
  },
  {
    id: 2,
    name: "ISE",
  },
];

const filteredBranches = (query: string) => {
  const res =
    query === ""
      ? []
      : list.filter((item: Item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return [...res];
};

export const Default = () => {
  const [selected, setSelected] = useState<Item>();

  return (
    <Combobox
      selected={selected}
      setSelected={setSelected}
      getFilteredList={filteredBranches}
      Label="Branches"
    />
  );
};
