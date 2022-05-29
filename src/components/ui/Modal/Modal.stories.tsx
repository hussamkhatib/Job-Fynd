import Modal from ".";

export default {
  title: "ui/Modal",
  component: Modal,
};

const action = () => {
  return undefined;
};
export const Default = () => {
  return (
    <Modal
      title="Deactivate"
      content="Are you sure you want to deactivate your account? All of your data will be permanently
  removed. This action cannot be undone."
      action={action}
    />
  );
};
