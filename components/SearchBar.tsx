import type { SearchBarProps } from "../types/artTypes";

export default function SearchBar({
  query,
  setQuery,
  handleSearch,
}: Omit<SearchBarProps, "showWithImagesOnly" | "setShowWithImagesOnly" | "hasResults">) {
  return (
    <form
      onSubmit={handleSearch}
      className="w-full flex flex-col sm:flex-row gap-2 items-start sm:items-center"
    >
      <div className="flex-1 w-full flex gap-2">
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
          className="flex-1 px-4 py-2 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>
  );
}
