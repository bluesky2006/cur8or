"use client";

import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import LogoHeader from "../../components/LogoHeader";
import ArtworkList from "../../components/ArtworkList";
import { useSearchState } from "../../lib/hooks/useSearchState";
import { useExhibition } from "../../context/ExhibitionContext";
import ExhibitionDrawer from "../../components/ExhibitionDrawer";

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

  const { exhibition, removeFromExhibition } = useExhibition();
  const [showExhibition, setShowExhibition] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <main className="w-full max-w-6xl">
        {/* header & search */}
        <div className="w-full">
          <div
            className={`flex gap-4 items-center ${
              results.length === 0 ? "flex-col text-center" : "flex-row"
            }`}
          >
            <LogoHeader big={results.length === 0} resetSearch={resetSearch} />
            <div className="w-full max-w-2xl">
              <SearchBar
                query={query}
                setQuery={(val: string) => {
                  setQuery(val);
                  if (val.trim() === "") resetSearch();
                }}
                handleSearch={handleSearch}
                showWithImagesOnly={showWithImagesOnly}
                setShowWithImagesOnly={setShowWithImagesOnly}
              />
            </div>
            {results.length > 0 && (
              <button
                type="button"
                onClick={() => setShowExhibition(true)}
                className="ml-auto flex bg-white text-yellow-500 border-2 border-yellow-500 px-6 py-2 rounded 
               hover:bg-yellow-500 hover:text-white transition-colors cursor-pointer"
              >
                My exhibition ({exhibition.length})
              </button>
            )}
          </div>
        </div>

        {/* error + results */}
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

      {/* Drawer as separate component */}
      <ExhibitionDrawer show={showExhibition} onClose={() => setShowExhibition(false)} />
    </div>
  );
}
