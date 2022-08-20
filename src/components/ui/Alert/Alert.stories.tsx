import { ComponentMeta } from "@storybook/react";
import Alert from ".";

export default {
  title: "ui/Alert",
  component: Alert,
} as ComponentMeta<typeof Alert>;

export const Error = () => (
  <Alert>
    The database server at database_host:database_port was reached but timed
    out. Please try again. Please make sure your database server is running at
    database_host:database_port.
  </Alert>
);
