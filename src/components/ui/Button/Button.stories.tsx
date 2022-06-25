import Button from ".";
import { ComponentMeta } from "@storybook/react";
import ButtonGroup from "./ButtonGroup";

export default {
  title: "ui/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Variants = () => (
  <ButtonGroup>
    <Button variant="primary">Primary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="text">Text</Button>
    <Button variant="danger">Danger</Button>
  </ButtonGroup>
);

export const Sizes = () => (
  <ButtonGroup>
    <Button size="xs">Button</Button>
    <Button size="sm">Button</Button>
    <Button size="md">Button</Button>
    <Button size="lg">Button</Button>
  </ButtonGroup>
);
