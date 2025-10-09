"use client";

import { useState } from "react";
import { useExhibition } from "../../context/ExhibitionContext";
import { useSearchContext } from "../../context/SearchContext";
import { searchAllMuseums } from "../../lib/api/searchAllMuseums";
import ArtworkList from "../../components/ArtworkList";
import BackgroundSlideshow from "../../components/BackgroundSlideshow";
import ExhibitionDrawer from "../../components/ExhibitionDrawer";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Home() {
  const { query, results, setResults, hasSearched, setHasSearched } = useSearchContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { exhibition } = useExhibition();
  const [showExhibition, setShowExhibition] = useState(false);

  const hasResults = results.length > 0;

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const artworks = await searchAllMuseums(query, 0, 6);
      setResults(artworks);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const moreArtworks = await searchAllMuseums(query, results.length, 6);
      setResults([...results, ...moreArtworks]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {!hasResults && <BackgroundSlideshow />}
      {!hasResults && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs z-0" aria-hidden="true" />
      )}

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <main className={`w-full max-w-6xl ${hasResults ? "pt-48 lg:pt-16" : ""}`}>
          <Header
            handleSearch={handleSearch}
            hasResults={hasResults}
            exhibitionCount={exhibition.length}
            onShowExhibition={() => setShowExhibition(true)}
            loading={loading}
          />

          {error && <p className="mt-4 text-red-600">{error}</p>}

          {!loading && hasSearched && results.length === 0 && !error && (
            <div className="flex items-center justify-center h-[10vh]">
              <p className="bg-black/60 text-white px-4 py-2 rounded-full text-center">
                No results found for “{query}”
              </p>
            </div>
          )}

          <ArtworkList results={results} />

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
          {hasResults && <Footer />}
        </main>

        <ExhibitionDrawer show={showExhibition} onClose={() => setShowExhibition(false)} />
      </div>
    </div>
  );
}
