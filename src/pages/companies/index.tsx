import { useQuery } from "react-query";
import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import companyCols from "../../store/company.data";
import axios from "axios";

const Companies = () => {
  return (
    <div>
      <NavTabs tabs={companiesTabs} />
      <CompaniesTable />
    </div>
  );
};

const CompaniesTable = () => {
  const { isLoading, data, error } = useQuery("companies", fetchCompanies);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  return <Table columns={companyCols} data={data} />;
};

export default Companies;

const fetchCompanies = async () => {
  const { data } = await axios.get("/api/company");
  return data;
};
