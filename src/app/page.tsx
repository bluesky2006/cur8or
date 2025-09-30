"use client";

import SearchBar from "../../components/SearchBar";
import LogoHeader from "../../components/LogoHeader";
import ArtworkList from "../../components/ArtworkList";
import { useSearchState } from "../../lib/hooks/useSearchState";

export default function Home() {
  const {
    query,
    setQuery,
    results,
    filteredResults,
    loading,
    error,
    hasSearched,
    showWithImagesOnly,
    setShowWithImagesOnly,
    handleSearch,
    loadMore,
    resetSearch,
  } = useSearchState(6);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <main className="w-full max-w-6xl">
        <div className="w-full">
          <div
            className={`
              flex gap-4
              ${results.length === 0 ? "flex-col items-center text-center" : "flex-row items-start"}
            `}
          >
            <LogoHeader big={results.length === 0} resetSearch={resetSearch} />
            <div className="w-full max-w-2xl">
              <SearchBar
                query={query}
                setQuery={(val: string) => {
                  setQuery(val);
                  if (val.trim() === "") {
                    resetSearch();
                  }
                }}
                handleSearch={handleSearch}
                showWithImagesOnly={showWithImagesOnly}
                setShowWithImagesOnly={setShowWithImagesOnly}
              />
            </div>
          </div>
        </div>

        {error && <p className="mt-4 text-red-600">{error}</p>}

        {!loading && hasSearched && results.length === 0 && !error && (
          <p className="mt-6 text-center text-gray-600">No results found for “{query}”.</p>
        )}

        {filteredResults.length > 0 && (
          <p className="mt-6">Showing {filteredResults.length} results</p>
        )}

        <ArtworkList results={filteredResults} />

        {results.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="bg-yellow-500 disabled:opacity-50 text-white px-6 py-3 rounded hover:bg-yellow-600"
            >
              {loading ? "Loading…" : "Show more"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
