import type { SearchBarProps } from "../types/artTypes";

export default function SearchBar({
  query,
  setQuery,
  handleSearch,
  showWithImagesOnly,
  setShowWithImagesOnly,
}: SearchBarProps) {
  return (
    <form
      onSubmit={handleSearch}
      className="w-full flex flex-col sm:flex-row gap-2 items-start sm:items-center"
    >
      <div className="flex-1 w-full flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artworks…"
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors"
        >
          Search
        </button>
      </div>

      <label className="text-sm flex items-center gap-3 pl-1 mt-1 sm:mt-0 leading-tight">
        <input
          type="checkbox"
          checked={showWithImagesOnly}
          onChange={(e) => setShowWithImagesOnly(e.target.checked)}
          className="form-checkbox border-gray-300 text-yellow-500 focus:ring-yellow-400 accent-yellow-500 scale-125"
        />
        <span className="relative top-[1px]">Results with images only</span>
      </label>
    </form>
  );
}
