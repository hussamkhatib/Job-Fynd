import ButtonGroup from "./ButtonGroup";
import Button from ".";

export default {
  title: "ui/ButtonGroup",
  component: ButtonGroup,
};

export const Default = () => (
  <ButtonGroup>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </ButtonGroup>
);
