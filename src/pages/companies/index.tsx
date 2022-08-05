import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { companyColumns } from "../../store/company.data";
import usePagination from "../../hooks/usePagination";
import { trpc } from "../../utils/trpc";
import Loader from "../../components/ui/Loader";
import { Fragment } from "react";
import Button from "../../components/ui/Button";
import CSVDownload from "../../utils/CSVDownload";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";

const Companies = () => {
  return (
    <div>
      <NavTabs tabs={companiesTabs} />
      <CompaniesTable />
    </div>
  );
};

const CompaniesTable = () => {
  const { pagination, pageSize, setPagination, fetchDataOptions } =
    usePagination(0, 10);

  const { isLoading, data, error } = trpc.useQuery([
    "companies.get",
    fetchDataOptions,
  ]);

  if (isLoading) return <Loader />;
  if (error instanceof Error) return <p>error</p>;

  return data ? (
    <Fragment>
      <DownloadCompanyData />
      <Table
        columns={companyColumns}
        data={data.results}
        setPagination={setPagination}
        state={{ pagination, columnVisibility: { id: false } }}
        pageCount={Math.ceil(data.count / pageSize)}
        manualPagination
      />
    </Fragment>
  ) : null;
};

export default Companies;

const DownloadCompanyData = () => {
  //TODO : HANDLE ERROR
  const { isLoading, error, refetch } = trpc.useQuery(
    ["admin.companies.getAll"],
    {
      enabled: false,
      onSuccess: (data) => {
        CSVDownload(data, "companies", true);
      },
    }
  );

  if (isLoading) return <Loader />;
  return (
    <ButtonGroup align="end">
      <Button onClick={() => refetch()}>Download</Button>
    </ButtonGroup>
  );
};
