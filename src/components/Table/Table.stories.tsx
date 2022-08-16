import { useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import Table from ".";
import useTableFilters from "./useTableFilters";
import { ComponentMeta } from "@storybook/react";

export default {
  title: "Table",
  component: Table,
} as ComponentMeta<typeof Table>;

export const Pagination = () => {
  const [data, setData] = useState<PokemonApiData>();
  const { pageIndex, pageSize, setPagination, fetchDataOptions, pagination } =
    useTableFilters(0, 5);

  useEffect(() => {
    fetchPokemonData(fetchDataOptions).then((data) => setData(data));
  }, [fetchDataOptions, pageIndex, pageSize]);

  if (Array.isArray(data?.results) && data?.results.length)
    return (
      <Table
        columns={pokemonColumns}
        data={data.results}
        pageCount={Math.ceil(data.count / pageSize)}
        setPagination={setPagination}
        pagination={pagination}
      />
    );
  return null;
};

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

const pokemonColumns = [
  pokemonColumnHelper.accessor("name", {
    header: "Name",
  }),
  pokemonColumnHelper.accessor("url", {
    header: "Url",
  }),
];

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
