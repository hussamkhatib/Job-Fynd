import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { studentCols } from "../../store/profile.data";

const Students = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/student")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoaded(true);
      });
  }, []);

  return (
    <div>
      <Table
        columns={studentCols}
        rowsCount={10}
        data={data}
        isLoading={!isLoaded}
      />
    </div>
  );
};

export default Students;
