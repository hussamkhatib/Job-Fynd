import JobPost from "../components/JobPost";

export default {
  title: "JobPost",
  component: JobPost,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <JobPost {...args} />;

// 👇 Each story then reuses that template
export const SingleJobRole = Template.bind({});
SingleJobRole.args = {
  JobDetails: {
    title: "Locale ai",
    employeesRange: "11 to 50",
    applied: 50,
    timeLeftInDays: 5,
    eligibility: {
      offerCount: "< 2",
      cgpa: "> 8",
      backlogs: "none",
    },
    jobRoles: [
      {
        title: "FrontEnd Enginner",
        location: "Bangalore - remote",
        salaryRange: "$10k - $25k",
        esopRange: "0.0% - 2.0%",
      },
    ],
  },
};

export const MultipleJobRole = Template.bind({});
MultipleJobRole.args = {
  JobDetails: {
    title: "Locale ai",
    employeesRange: "11 to 50",
    applied: 50,
    timeLeftInDays: 5,
    eligibility: {
      offerCount: "< 2",
      cgpa: "> 8",
      backlogs: "none",
    },
    jobRoles: [
      {
        title: "FrontEnd Enginner",
        location: "Bangalore - remote",
        salaryRange: "$10k - $25k",
        esopRange: "0.0% - 2.0%",
      },
      {
        title: "Senior FrontEnd Enginner",
        location: "Bangalore - remote",
        salaryRange: "$25k - $40k",
        esopRange: "1.0% - 3.0%",
      },
    ],
  },
};
