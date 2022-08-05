import { Fragment } from "react";
import NavTabs from "../../components/NavTabs";
import { studentsTabs } from "../../components/NavTabs/tabs";
import Table from "../../components/Table";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/Button/ButtonGroup";
import Loader from "../../components/ui/Loader";
import usePagination from "../../hooks/usePagination";
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
  const { pagination, pageSize, setPagination, fetchDataOptions } =
    usePagination(0, 10);
  const { data, isLoading } = trpc.useQuery([
    "admin.student.offers",
    fetchDataOptions,
  ]);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <Fragment>
          <DownloadStudentOfferData />
          <Table
            columns={adminStudentOfferColumns}
            data={data.results}
            setPagination={setPagination}
            state={{ pagination, columnVisibility: { id: false } }}
            pageCount={Math.ceil(data.count / pageSize)}
            manualPagination
          />
        </Fragment>
      ) : null}
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
      {isLoading ? (
        <Loader />
      ) : (
        <Button onClick={() => refetch()}>Download</Button>
      )}
    </ButtonGroup>
  );
};
