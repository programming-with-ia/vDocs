import React from "react";
import { useSearchParams } from "./useSearchParams"; // Adjust the import path as needed

const SearchComponent = () => {
  const { params, updateSearchParams, clearSearchParams } = useSearchParams<{
    search: string;
    page: string;
  }>();

  return (
    <div>
      <h2>Search Parameters</h2>
      <p>Search: {params.search || "None"}</p>
      <p>Page: {params.page || "None"}</p>

      <button
        onClick={() => updateSearchParams({ search: "react", page: "1" })}
      >
        Set Search to "react"
      </button>
      <button onClick={clearSearchParams}>Clear Search Params</button>
    </div>
  );
};

export default SearchComponent;
