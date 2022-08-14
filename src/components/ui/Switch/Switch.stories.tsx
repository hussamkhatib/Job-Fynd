import { ComponentMeta } from "@storybook/react";
import Switch from ".";

export default {
  title: "ui/Switch",
  component: Switch,
} as ComponentMeta<typeof Switch>;

export const Default = () => (
  <Switch Lable="Enable Notification" action={() => null} />
);
