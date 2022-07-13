import { useQuery } from "react-query";
import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import axios, { AxiosError } from "axios";
import { companyColumns, CompanyTable } from "../../store/company.data";
import usePagination from "../../hooks/usePagination";
import AxiosErrorMsg from "../../components/AxiosErrorMsg";

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
  const { isLoading, data, error } = useQuery(
    ["companies", fetchDataOptions],
    () => fetchCompanies(fetchDataOptions)
  );

  if (isLoading) return <span>Loading...</span>;
  if (error instanceof Error)
    return <AxiosErrorMsg error={error as AxiosError} />;

  return (
    <Table
      table={CompanyTable}
      columns={companyColumns}
      data={data.results}
      setPagination={setPagination}
      state={{ pagination, columnVisibility: { id: false } }}
      pageCount={Math.ceil(data.count / pageSize)}
      manualPagination
    />
  );
};

export default Companies;

const fetchCompanies = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  const { data } = await axios.get(
    `/api/company?offset=${pageIndex}&limit=${pageSize}`
  );
  return data;
};
