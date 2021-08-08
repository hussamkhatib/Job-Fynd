import ApplyForm from "../components/ApplyForm";
import { useUser } from "@auth0/nextjs-auth0";
import CreateAnAccount from "../components/CreateAnAccount";

function Apply() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {user ? (
        <>
          {JSON.stringify(user, null, 2)}
          <ApplyForm />{" "}
        </>
      ) : (
        <CreateAnAccount />
      )}
    </>
  );
}

export default Apply;
