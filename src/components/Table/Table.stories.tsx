import { useEffect } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import Table from ".";
import usePagination from "../../hooks/usePagination";
import { ComponentMeta } from "@storybook/react";

export default {
  title: "Table",
  component: Table,
} as ComponentMeta<typeof Table>;

export const Default = () => {
  return <Table columns={columns} data={data} />;
};

export const Pagination = () => {
  const [data, setData] = useState<PokemonApiData>();
  const { pageIndex, pageSize, setPagination, fetchDataOptions, pagination } =
    usePagination(0, 5);

  useEffect(() => {
    fetchPokemonData(fetchDataOptions).then((data) => setData(data));
  }, [fetchDataOptions, pageIndex, pageSize]);

  if (Array.isArray(data?.results) && data?.results.length)
    return (
      <Table
        columns={pokemonColumns}
        data={data.results}
        manualPagination
        pageCount={Math.ceil(data.count / pageSize)}
        setPagination={setPagination}
        state={{
          pagination,
        }}
      />
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

const fetchPokemonData = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
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
const pokemonColumnHelper = createColumnHelper<Pokemon>();

const columns: ColumnDef<Person>[] = [
  {
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
      },
      {
        header: "More Info",
        columns: [
          {
            accessorKey: "visits",
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "status",
            header: "Status",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "progress",
            header: "Profile Progress",
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];

const pokemonColumns = [
  pokemonColumnHelper.accessor("name", {
    header: "Name",
  }),
  pokemonColumnHelper.accessor("url", {
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

interface PokemonApiData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
type Pokemon = {
  url: string;
  name: string;
};
