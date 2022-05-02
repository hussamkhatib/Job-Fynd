import Table from ".";
import { allEvents } from "../pages/Events/events.data";

export default {
  title: "Table",
  component: Table,
};

export const Primary = () => (
  <Table columns={allEvents.columns} data={allEvents.data} />
);
