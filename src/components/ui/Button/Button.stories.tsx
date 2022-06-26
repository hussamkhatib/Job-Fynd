import Button from ".";
import { ComponentMeta } from "@storybook/react";
import { CheckIcon } from "@heroicons/react/solid";
import ButtonGroup from "./ButtonGroup";

export default {
  title: "ui/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Default = () => (
  <ButtonGroup>
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="minimal">Minimal</Button>
    <Button color="warn">Warn</Button>
  </ButtonGroup>
);

export const Disabled = () => (
  <ButtonGroup>
    <Button disabled color="primary">
      Primary
    </Button>
    <Button disabled color="secondary">
      Secondary
    </Button>
    <Button disabled color="minimal">
      Minimal
    </Button>
  </ButtonGroup>
);

export const Loading = () => (
  <ButtonGroup>
    <Button loading color="primary">
      Primary
    </Button>
    <Button loading color="secondary">
      Secondary
    </Button>
    <Button loading color="minimal">
      Minimal
    </Button>
    <Button loading color="warn">
      Warn
    </Button>
  </ButtonGroup>
);

export const Sizes = () => (
  <ButtonGroup>
    <Button size="sm" color="primary">
      Sm
    </Button>
    <Button size="base" color="primary">
      Base
    </Button>
    <Button size="lg" color="primary">
      Lg
    </Button>
    <Button StartIcon={CheckIcon} size="icon" color="primary">
      Icon
    </Button>
  </ButtonGroup>
);
