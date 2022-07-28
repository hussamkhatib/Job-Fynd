import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import { companyColumns } from "../../store/company.data";
import usePagination from "../../hooks/usePagination";
import { trpc } from "../../utils/trpc";

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

  if (isLoading) return <span>Loading...</span>;
  if (error instanceof Error) return <p>error</p>;

  return data ? (
    <Table
      columns={companyColumns}
      data={data.results}
      setPagination={setPagination}
      state={{ pagination, columnVisibility: { id: false } }}
      pageCount={Math.ceil(data.count / pageSize)}
      manualPagination
    />
  ) : null;
};

export default Companies;
