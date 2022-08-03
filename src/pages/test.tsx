import Loader from "../components/ui/Loader";
import { trpc } from "../utils/trpc";

const Test = () => {
  const { data, error, isLoading } = trpc.useQuery(["users.me"]);
  if (isLoading) return <Loader/>
  if (error) return <div>{JSON.stringify(error)}</div>;
  return <div>{JSON.stringify(data)}</div>;
};

export default Test;
