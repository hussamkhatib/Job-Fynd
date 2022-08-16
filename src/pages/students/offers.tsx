import { Fragment } from "react";
import NavTabs from "../../components/NavTabs";
import { studentsTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Loader from "../../components/ui/Loader";
import useTableFilters from "../../components/Table/useTableFilters";
import { adminStudentOfferColumns } from "../../store/offer.data";
import CSVDownload from "../../utils/CSVDownload";
import { trpc } from "../../utils/trpc";

const StudentOffers = () => {
  return (
    <div>
      <NavTabs tabs={studentsTabs} />
      <StudentOffersTable />
    </div>
  );
};

export default StudentOffers;

const StudentOffersTable = () => {
  const {
    pagination,
    pageSize,
    setPagination,
    fetchDataOptions,
    sorting,
    setSorting,
  } = useTableFilters(0, 10);
  const { data, isLoading } = trpc.useQuery(
    ["admin.student.offers", fetchDataOptions],
    {
      keepPreviousData: true,
    }
  );

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : data && data.count > 0 ? (
        <Fragment>
          <DownloadStudentOfferData />
          <Table
            columns={adminStudentOfferColumns}
            data={data.results}
            setPagination={setPagination}
            pagination={pagination}
            pageCount={Math.ceil(data.count / pageSize)}
            setSorting={setSorting}
            sorting={sorting}
          />
        </Fragment>
      ) : (
        <>No Offers yet!</>
      )}
    </Fragment>
  );
};

const DownloadStudentOfferData = () => {
  //TODO : HANDLE ERROR
  const { isLoading, error, refetch } = trpc.useQuery(
    ["admin.student.offers.getAll"],
    {
      enabled: false,
      onSuccess: (data) => {
        CSVDownload(data, "studentoffers", true);
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
