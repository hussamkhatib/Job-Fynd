import Job from ".";
import {
  jobWithSingleOpenPosition,
  jobWithMultipleOpenPositions,
} from "../Jobs/jobs.mocks";

export default {
  title: "Job",
  component: Job,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Job {...args} />;

// 👇 Each story then reuses that template
export const SinglePosition = Template.bind({});
SinglePosition.args = jobWithSingleOpenPosition;

export const MultiplePositions = Template.bind({});
MultiplePositions.args = jobWithMultipleOpenPositions;
