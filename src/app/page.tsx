"use client";

import { useState } from "react";
import ArtworkList from "../../components/ArtworkList";
import { useSearchState } from "../../lib/hooks/useSearchState";
import { useExhibition } from "../../context/ExhibitionContext";
import ExhibitionDrawer from "../../components/ExhibitionDrawer";
import Header from "../../components/Header";
import BackgroundSlideshow from "../../components/BackgroundSlideshow";

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

  return (
    <div className="relative min-h-screen">
      {!hasResults && <BackgroundSlideshow />}

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <main className={`w-full max-w-6xl ${hasResults ? "pt-12" : ""}`}>
          <Header
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
            showWithImagesOnly={showWithImagesOnly}
            setShowWithImagesOnly={setShowWithImagesOnly}
            resetSearch={resetSearch}
            hasResults={hasResults}
            exhibitionCount={exhibition.length}
            onShowExhibition={() => setShowExhibition(true)}
          />

          {error && <p className="mt-4 text-red-600">{error}</p>}
          {!loading && hasSearched && results.length === 0 && !error && (
            <p className="mt-6 text-center text-gray-600">No results found for “{query}”.</p>
          )}

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

        <ExhibitionDrawer show={showExhibition} onClose={() => setShowExhibition(false)} />
      </div>
    </div>
  );
}
