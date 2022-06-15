import { useEffect } from "@storybook/addons";
import { createTable } from "@tanstack/react-table";
import { useState } from "react";
import Table from ".";
import usePagination from "../../hooks/usePagination";
import Button from "../ui/Button";

export default {
  title: "Table",
  component: Table,
};

export const Default = () => {
  return <Table table={table} columns={columns} data={data} />;
};

export const Pagination = () => {
  const [data, setData] = useState<any>([]);
  const { pageIndex, pageSize, setPagination, fetchDataOptions, pagination } =
    usePagination(0, 5);

  useEffect(() => {
    fetchPokemonData(fetchDataOptions).then((data) => setData(data));
  }, [fetchDataOptions, pageIndex, pageSize]);

  if (Array.isArray(data?.results) && data?.results.length)
    return (
      <div>
        <Table
          table={pokemonTable}
          columns={pokemonColumns}
          data={data.results}
          manualPagination
          pageCount={Math.ceil(data.count / pageSize)}
          setPagination={setPagination}
          state={{
            pagination,
          }}
        />
        <Button
          size="sm"
          onClick={() =>
            fetchPokemonData({ pageIndex, pageSize }).then((data) =>
              setData(data)
            )
          }
        >
          refetch
        </Button>
        <p>
          The refetch button is provided as <code>useEffect</code> is not fired
          when any of the deps array is changed in storybook
        </p>
      </div>
    );
  return null;
};

const data: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const fetchPokemonData = async ({ pageIndex, pageSize }: any) => {
  const offset = pageIndex * pageSize;
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`
    );
    const data = await response.json();
    return data;
  } catch (e) {
    if (e instanceof Error) throw new Error(`API error:${e?.message}`);
  }
};

const table = createTable().setRowType<Person>();

const pokemonTable = createTable().setRowType<Pokemon>();

const columns = [
  table.createGroup({
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      table.createDataColumn("firstName", {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      }),
      table.createDataColumn((row) => row.lastName, {
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),
  table.createGroup({
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      table.createDataColumn("age", {
        header: () => "Age",
      }),
      table.createGroup({
        header: "More Info",
        columns: [
          table.createDataColumn("visits", {
            header: () => <span>Visits</span>,
          }),
          table.createDataColumn("status", {
            header: "Status",
          }),
          table.createDataColumn("progress", {
            header: "Profile Progress",
          }),
        ],
      }),
    ],
  }),
];

const pokemonColumns = [
  pokemonTable.createDataColumn("name", {
    header: "name",
  }),
  pokemonTable.createDataColumn("url", {
    header: "Url",
  }),
];

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

type Pokemon = {
  url: string;
  name: string;
};
