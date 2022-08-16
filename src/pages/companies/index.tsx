import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { companyColumns } from "../../store/company.data";
import useTableFilters from "../../components/Table/useTableFilters";
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
  if (error instanceof Error) return <p>error</p>;

  return data && data.count > 0 ? (
    <Fragment>
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
    </Fragment>
  ) : (
    <>No Companies Yet</>
  );
};

export default Companies;

const DownloadCompanyData = () => {
  //TODO : HANDLE ERROR
  const { isLoading, error, refetch } = trpc.useQuery(
    ["admin.company.getAll"],
    {
      enabled: false,
      onSuccess: (data) => {
        CSVDownload(data, "companies", true);
      },
    }
  );

  return (
    <ButtonGroup align="end">
      <Button loading={isLoading} onClick={() => refetch()}>
        Download
      </Button>
    </ButtonGroup>
  );
};
