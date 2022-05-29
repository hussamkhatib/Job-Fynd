import { Fragment, useState } from "react";
import Modal from ".";
import Button from "../Button";

export default {
  title: "ui/Modal",
  component: Modal,
};

const action = () => {
  return undefined;
};
export const Default = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Modal
        title="Deactivate"
        content="Are you sure you want to deactivate your account? All of your data will be permanently
  removed. This action cannot be undone."
        action={action}
        state={{ open, setOpen }}
      />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </Fragment>
  );
};
