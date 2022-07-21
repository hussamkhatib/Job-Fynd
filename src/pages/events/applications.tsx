import { Role } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { flattenObject } from "../../../util/helper";
import AxiosErrorMsg from "../../components/AxiosErrorMsg";
import NavTabs from "../../components/NavTabs";
import { studentEventTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import {
  studentApplicationEventTable,
  studentApplicationEventColumns,
} from "../../store/events.data";

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
  const { isLoading, data, error } = useQuery(
    "studentApplications",
    fetchStudentApplications,
    {
      select: (data) => {
        const res = data.map((value: any) => flattenObject(value));
        res.forEach((ele: any) => {
          delete Object.assign(ele, { ["company"]: ele["name"] })["name"];
        });
        return res;
      },
    }
  );

  return (
    <div>
      <h1 className="py-4 text-xl font-semibold">
        Applied Companies
        {/* (Excludes The Companies you are placed) */}
      </h1>
      {isLoading ? (
        <span>Loading...</span>
      ) : error instanceof Error ? (
        <AxiosErrorMsg error={error as AxiosError} />
      ) : Array.isArray(data) && !data.length ? (
        <span>You have not applied to any events yet.</span>
      ) : (
        <Table
          table={studentApplicationEventTable}
          columns={studentApplicationEventColumns}
          data={data}
          state={{ columnVisibility: { id: false } }}
        />
      )}
    </div>
  );
};

const fetchStudentApplications = async () => {
  const { data } = await axios.get(`/api/me/applications`);
  return data;
};
