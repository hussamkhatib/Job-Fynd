import Button from ".";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "ui/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const variants = () => (
  <div>
    <Button variant="primary">Primary</Button>
  </div>
);

export const sizes = () => (
  <div>
    <Button size="xs">Button</Button>
    <Button size="sm">Button</Button>
    <Button size="md">Button</Button>
    <Button size="lg">Button</Button>
  </div>
);
