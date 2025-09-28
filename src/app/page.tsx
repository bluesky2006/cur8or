"use client";

import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import ArtworkList from "../../components/ArtworkList";
import { cmaSearchArtworks } from "../../lib/api/cma";
import type { Artwork } from "../../types/types";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState<number>(0);
  const limit = 9;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const artworks = await cmaSearchArtworks(query, 0, limit);
      setResults(artworks);
      setSkip(limit);
    } catch {
      setError("Something went wrong with your search.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const moreArtworks = await cmaSearchArtworks(query, skip, limit);
      setResults((prev) => [...prev, ...moreArtworks]);
      setSkip(skip + limit);
    } catch {
      setError("Could not load more results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <main className="w-full max-w-6xl">
        {/* Keep search bar centered/narrow */}
        <div className="max-w-xl mx-auto">
          <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
        </div>

        {loading && <p className="mt-4">Loading…</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {results.length > 0 && <p className="mt-6">Showing {results.length} results</p>}

        {/* Results grid spans wider */}
        <ArtworkList results={results} />

        {results.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={loadMore}
              className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600"
            >
              Show more
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
