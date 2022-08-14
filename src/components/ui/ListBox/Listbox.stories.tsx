import { ComponentMeta } from "@storybook/react";
import { useState } from "react";
import Listbox from ".";
import { branches } from "../../../store/student.data";

export default {
  title: "ui/Listbox",
  component: Listbox,
} as ComponentMeta<typeof Listbox>;

export const Default = () => {
  const [selected, setSelected] = useState(branches[0]);

  return (
    <Listbox
      selected={selected}
      setSelected={setSelected}
      list={branches}
      Label="Branches allowed"
    />
  );
};

export const Multiple = () => {
  const [selected, setSelected] = useState([branches[0], branches[1]]);

  return (
    <Listbox
      selected={selected}
      setSelected={setSelected}
      list={branches}
      multiple
      Label="Branches allowed"
    />
  );
};

const persons = [
  {
    id: "1",
    name: "ROb",
  },
  {
    id: "2",
    name: "Mary",
  },
];
export const ObjectDefault = () => {
  const [selected, setSelected] = useState(persons[0]);

  return (
    <Listbox
      selected={selected}
      setSelected={setSelected}
      list={persons}
      Label="Choose Person"
    />
  );
};

export const ObjectMultiple = () => {
  const [selected, setSelected] = useState([persons[0], persons[1]]);

  return (
    <Listbox
      selected={selected}
      setSelected={setSelected}
      list={persons}
      Label="Choose Person"
      multiple
    />
  );
};
