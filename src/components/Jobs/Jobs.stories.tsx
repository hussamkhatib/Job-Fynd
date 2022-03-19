import { PureJobsList } from ".";
import { jobs } from "./jobs.mocks";

export default {
  title: "Jobs",
  component: PureJobsList,
};

export const Success = () => (
  <PureJobsList loading={false} error={false} jobs={jobs} />
);

export const Loading = () => (
  <PureJobsList loading={true} error={false} jobs={null} />
);

export const Error = () => (
  <PureJobsList
    loading={false}
    error="Oops ! something went wrong"
    jobs={null}
  />
);
