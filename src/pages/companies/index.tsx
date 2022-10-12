import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { companyColumns } from "../../store/company.data";
import useTableFilters from "../../components/Table/useTableFilters";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import CSVDownload from "../../utils/CSVDownload";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Alert from "../../components/ui/Alert";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Error from "next/error";
import { Role } from "@prisma/client";

const Companies = () => {
  const { data: session } = useSession();
  if (session?.user.role === Role.student) return <Error statusCode={403} />;

  return (
    <>
      <NavTabs tabs={companiesTabs} />
      <CompaniesTable />
    </>
  );
};

const CompaniesTable = () => {
  const {
    pagination,
    pageSize,
    setPagination,
    fetchDataOptions,
    // sorting,
    // setSorting,
  } = useTableFilters(0, 10);

  const { isLoading, data, error } = trpc.useQuery(
    ["admin.company.get", fetchDataOptions],
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Loader />;
  if (error) return <Alert>{error.message}</Alert>;

  return data && data.count > 0 ? (
    <div className="max-w-5xl mx-auto">
      <DownloadCompanyData />
      <Table
        columns={companyColumns}
        data={data.results}
        setPagination={setPagination}
        pagination={pagination}
        pageCount={Math.ceil(data.count / pageSize)}
        // setSorting={setSorting}
        // sorting={sorting}
      />
    </div>
  ) : (
    <>No Companies Yet</>
  );
};

export default Companies;

const DownloadCompanyData = () => {
  const { isLoading, refetch } = trpc.useQuery(["admin.company.getAll"], {
    enabled: false,
    onSuccess: (data) => {
      CSVDownload(data, "companies", true);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <ButtonGroup align="end">
      <Button loading={isLoading} onClick={() => refetch()}>
        Download
      </Button>
    </ButtonGroup>
  );
};
