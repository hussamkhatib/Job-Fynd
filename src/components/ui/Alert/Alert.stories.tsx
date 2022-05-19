import Alert from ".";

export default {
  title: "ui/Alert",
  component: Alert,
};

export const Status = () => (
  <div className="flex flex-col space-y-4">
    <Alert status={"error"}>Error</Alert>
    <Alert status={"info"}>Info</Alert>
    <Alert status={"warning"}>Warning</Alert>
    <Alert status={"success"}>Success</Alert>
  </div>
);
