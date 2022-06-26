import { Fragment, useState } from "react";
import Button from "../Button";
import ButtonGroup from "../Button/ButtonGroup";
import Modal from ".";

export default {
  title: "ui/Modal",
  component: Modal,
};

export const Default = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Modal title="Deactivate" state={{ open, setOpen }}>
        <p className="text-sm text-gray-500">
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>
        <ButtonGroup className="px-4 py-3 space-x-4 sm:px-6 sm:flex sm:flex-row-reverse">
          <Button onClick={() => setOpen(false)}>Delete</Button>
          <Button color="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </ButtonGroup>
      </Modal>
      <Button onClick={() => setOpen(true)}>Open</Button>
    </Fragment>
  );
};
