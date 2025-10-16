"use client";

import { useSearchContext } from "../context/SearchContext";
import { SearchBarProps } from "../types/artTypes";

export default function SearchBar({ handleSearch, loading }: SearchBarProps) {
  const { query, setQuery } = useSearchContext();

  return (
    <form
      onSubmit={handleSearch}
      className="w-full flex flex-col sm:flex-row gap-2 items-start sm:items-center "
    >
      <div className="flex-1 w-full flex gap-2 ">
        <label htmlFor="search" className="sr-only">
          Search artworks
        </label>

        <input
          id="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artworks…"
          aria-label="Search artworks"
          disabled={loading}
          className="flex-1 px-4 py-2 rounded-full bg-[#f9f9f9] dark:bg-[#1a1a1a] border  border-gray-300 focus:outline-none focus:border-amber-400 placeholder-gray-600 text-gray-600 focus:shadow-[0_0_20px_rgba(250,204,21,0.4)]  dark:placeholder-gray-400 dark:text-amber-400 transition-all duration-300 disabled:opacity-70  disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span className="relative inline-flex items-center justify-center min-w-[80px]">
            {loading ? (
              <div
                className="absolute w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                aria-hidden="true"
              />
            ) : (
              "Search"
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
