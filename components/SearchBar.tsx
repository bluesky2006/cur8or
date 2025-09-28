import { SearchBarProps } from "../types/types";

export default function SearchBar({ query, setQuery, handleSearch }: SearchBarProps) {
  return (
    <form onSubmit={handleSearch} className="flex items-center justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search artworks..."
        className="border border-gray-300 rounded-full px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <button
        type="submit"
        className="ml-2 bg-yellow-500 text-white rounded-full px-4 py-3 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        Search
      </button>
    </form>
  );
}
