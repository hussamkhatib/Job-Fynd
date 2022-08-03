import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { flattenObject } from "../../utils/helper";
import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { studentApplicationEventColumns } from "../../store/events.data";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";

const Applications = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.admin) return null;
  return (
    <div>
      <NavTabs tabs={studentEventTabs} />
      <StudentApplications />
    </div>
  );
};

export default Applications;

const StudentApplications = () => {
  const { isLoading, data, error } = trpc.useQuery(["users.me.applications"], {
    select: (data) => {
      const res = data?.map((value: any) => flattenObject(value));
      res?.forEach((ele: any) => {
        delete Object.assign(ele, { ["company"]: ele["name"] })["name"];
      });
      return res;
    },
  });
  return (
    <div>
      <h1 className="py-4 text-xl font-semibold">
        Applied Companies
        {/* (Excludes The Companies you are placed)  */}
      </h1>
      {isLoading ? (
        <Loader />
      ) : error instanceof Error ? (
        // TODO:3a8f839d-357b-441b-a4fc-6b1d83c31f30
        <span>Error</span>
      ) : Array.isArray(data) && !data.length ? (
        <span>You have not applied to any events yet.</span>
      ) : data ? (
        <Table
          columns={studentApplicationEventColumns}
          data={data}
          state={{ columnVisibility: { id: false } }}
        />
      ) : null}
    </div>
  );
};
