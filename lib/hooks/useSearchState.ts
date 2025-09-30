import { useState } from "react";
import { searchAllMuseums } from "../api/searchAllMuseums";
import type { NormalisedArtwork } from "../../types/artTypes";

export function useSearchState(limit = 6) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<NormalisedArtwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cmaSkip, setCmaSkip] = useState(0);
  const [siStart, setSiStart] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [showWithImagesOnly, setShowWithImagesOnly] = useState(false);

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

  const resetSearch = () => {
    setQuery("");
    setResults([]);
    setError(null);
    setHasSearched(false);
  };

  const filteredResults = showWithImagesOnly ? results.filter((art) => !!art.imageUrl) : results;

  return {
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
  };
}