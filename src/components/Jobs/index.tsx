import { FC, useEffect, useState } from "react";
import Job from "../Job";
import JobDetails from "../Job/job.types";

interface Props {
  loading: boolean;
  error: boolean | string;
  jobs: null | JobDetails[];
}

export const PureJobsList: FC<Props> = ({ loading, error, jobs }) => {
  if (loading) return <p>loading</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      {jobs?.map((job) => (
        <Job key={job.title} {...job} />
      ))}
    </>
  );
};

const Jobs = () => {
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoaded(true);
      });
  }, []);

  return <PureJobsList loading={!isLoaded} error={!jobs} jobs={jobs} />;
};

export default Jobs;
