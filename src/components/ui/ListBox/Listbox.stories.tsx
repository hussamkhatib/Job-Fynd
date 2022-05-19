import { useState } from "react";
import Listbox from ".";
import { branches } from "../../../store/student.data";

export default {
  title: "ui/Listbox",
  component: Listbox,
};

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
