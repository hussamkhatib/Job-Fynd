import { ComponentMeta } from "@storybook/react";
import Loader from ".";

export default {
  title: "ui/Loader",
  component: Loader,
} as ComponentMeta<typeof Loader>;

export const Default = () => {
  return <Loader />;
};
