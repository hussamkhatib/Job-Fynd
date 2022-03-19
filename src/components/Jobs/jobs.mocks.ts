import { rest } from 'msw'
export const jobWithSingleOpenPosition = {
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
    }
  ],
}

export const jobWithMultipleOpenPositions = 
  {...jobWithSingleOpenPosition,
    jobRoles: [...jobWithSingleOpenPosition.jobRoles,
  {
    title: "Senior FrontEnd Enginner",
    location: "Bangalore - remote",
    salaryRange: "$25k - $40k",
    esopRange: "1.0% - 3.0%",
  },
]}

export const jobs = [jobWithSingleOpenPosition,
  {
    title: "Flixed",
    employeesRange: "1 to 10",
    applied: 120,
    timeLeftInDays: 2,
    eligibility: {
      offerCount: "< 1",
      cgpa: "> 7",
      backlogs: "none",
    },
    jobRoles: [
      {
        title: "BackEnd Enginner",
        location: "remote",
        salaryRange: "$7.5k - $25k",
        esopRange: "0.0% - 2.0%",
      },
    ],
  }]

export const jobsHandlers = [
  rest.get('/jobs', (req, res, ctx) => {
    return res(
      ctx.json(jobs)   
    )
  }),
]
