"use client";

import { useEffect, useState } from "react";
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

  const { exhibition } = useExhibition();
  const [showExhibition, setShowExhibition] = useState(false);

  const hasResults = results.length > 0;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <main className={`w-full max-w-6xl ${hasResults ? "pt-16" : ""}`}>
        {/* Header */}
        <div
          className={`${
            hasResults
              ? `fixed top-0 left-0 w-full z-50 bg-white ${scrolled ? "shadow" : ""}`
              : "w-full"
          }`}
        >
          <div
            className={`max-w-6xl mx-auto flex gap-4 items-center p-4
              ${!hasResults ? "flex-col text-center" : "flex-row"}
            `}
          >
            <LogoHeader big={!hasResults} resetSearch={resetSearch} />
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
            {hasResults && (
              <button
                type="button"
                onClick={() => setShowExhibition(true)}
                className="ml-auto flex bg-white text-yellow-500 border-2 border-yellow-500 px-6 py-2 rounded 
                  hover:bg-yellow-500 hover:text-white transition-colors cursor-pointer"
              >
                My Exhibition ({exhibition.length})
              </button>
            )}
          </div>
        </div>

        {/* Search feedback */}
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {!loading && hasSearched && results.length === 0 && !error && (
          <p className="mt-6 text-center text-gray-600">No results found for “{query}”.</p>
        )}

        {/* Results */}
        <ArtworkList results={filteredResults} />
        {hasResults && (
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

      {/* Exhibition drawer */}
      <ExhibitionDrawer show={showExhibition} onClose={() => setShowExhibition(false)} />
    </div>
  );
}
