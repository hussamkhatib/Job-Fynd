interface Eligibility {
    offerCount: string;
    cgpa: string;
    backlogs: string;
  }
  
  interface JobRole {
    title: string;
    location: string;
    salaryRange: string;
    esopRange?: string;
  }
  
  export default interface JobDetails {
    title: string;
    employeesRange: string;
    applied: number;
    timeLeftInDays: number;
    eligibility: Eligibility | null;
    jobRoles: JobRole[];
  }