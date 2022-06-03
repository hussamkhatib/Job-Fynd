import { useQuery } from "react-query";
import NavTabs from "../../components/NavTabs";
import { companiesTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import companyCols from "../../store/company.data";
import axios from "axios";

const fetchCompanies = async () => {
  const { data } = await axios.get("/api/company");
  return data;
};
const Companies = () => {
  const { isLoading, data, error } = useQuery("companies", fetchCompanies);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div>
      <NavTabs tabs={companiesTabs} />
      <Table columns={companyCols} rowsCount={10} data={data} />
    </div>
  );
};

export default Companies;
