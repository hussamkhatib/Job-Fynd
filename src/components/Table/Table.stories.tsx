import Table from ".";
import { allEvents } from "../pages/Events/events.data";
import { sampleStudent1 } from "../pages/Profile/data";

export default {
  title: "Table",
  component: Table,
};

export const Primary = () => (
  <Table columns={allEvents.columns} data={allEvents.data} />
);
export const OverFlow = () => (
  <Table columns={sampleStudent1.columns} data={sampleStudent1.data} />
);
