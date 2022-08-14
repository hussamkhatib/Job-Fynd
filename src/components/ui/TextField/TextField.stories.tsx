import { ComponentMeta } from "@storybook/react";
import TextField from "./TextField";

export default {
  title: "ui/TextField",
  component: TextField,
} as ComponentMeta<typeof TextField>;

export const Default = () => {
  return (
    <TextField
      type="text"
      id="id"
      label="Label"
      defaultValue="value"
      name={""}
    />
  );
};
