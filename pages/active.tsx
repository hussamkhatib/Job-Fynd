import Temp from "../components/Temp";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      {JSON.stringify(user, null, 2)}
      <Temp />
    </div>
  );
}
