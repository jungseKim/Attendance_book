import React from "react";

function Search({ onSubmit }: { onSubmit: (filterValue: any) => void }) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(event.target.elements.filter.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-x-2 items-baseline w-1/3">
      <input
        name="filter"
        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder={"search"}
      />
      <button className="text-gray-100 rounded-lg  pr-2 pl-2 pt-1 pb-1 bg-gray-500 hover:bg-blue-400">
        Search
      </button>
    </form>
  );
}

export default Search;
