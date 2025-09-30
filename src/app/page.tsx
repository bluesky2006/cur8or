"use client";

import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import LogoHeader from "../../components/LogoHeader";
import ArtworkList from "../../components/ArtworkList";
import { searchAllMuseums } from "../../lib/api/searchAllMuseums";
import type { NormalisedArtwork } from "../../types/artTypes";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<NormalisedArtwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cmaSkip, setCmaSkip] = useState(0);
  const [siStart, setSiStart] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const limit = 9;

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
      const artworks = await searchAllMuseums(query, 0, 0, limit);
      setResults(artworks);
      setCmaSkip(limit);
      setSiStart(limit);
    } catch {
      setError("Something went wrong with your search.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const moreArtworks = await searchAllMuseums(query, cmaSkip, siStart, limit);
      setResults((prev) => [...prev, ...moreArtworks]);
      setCmaSkip(cmaSkip + limit);
      setSiStart(siStart + limit);
    } catch {
      setError("Could not load more results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <main className="w-full max-w-6xl">
        <div
          className={`
    transition-all duration-700 ease-in-out max-w-xl mx-auto
    ${results.length > 0 ? "mt-10 delay-100" : "mt-20 delay-0"}
  `}
        >
          <div
            className={`
      flex items-center gap-4
      ${results.length === 0 ? "flex-col justify-center text-center" : "flex-row"}
    `}
          >
            <LogoHeader big={results.length === 0} />
            <SearchBar
              query={query}
              setQuery={(val: string) => {
                setQuery(val);
                if (val.trim() === "") {
                  setHasSearched(false);
                  setResults([]);
                  setError(null);
                }
              }}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {!loading && hasSearched && results.length === 0 && !error && (
          <p className="mt-6 text-center text-gray-600">No results found for “{query}”.</p>
        )}

        {results.length > 0 && <p className="mt-6">Showing {results.length} results</p>}

        <ArtworkList results={results} />

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
