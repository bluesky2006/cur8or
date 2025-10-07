"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { SearchContextType, NormalisedArtwork } from "../types/artTypes";

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NormalisedArtwork[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("searchState");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.query) setQuery(parsed.query);
        if (parsed.results) setResults(parsed.results);
        if (parsed.hasSearched) setHasSearched(parsed.hasSearched);
      } catch (err) {
        console.error("Failed to parse saved search state:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchState", JSON.stringify({ query, results, hasSearched }));
  }, [query, results, hasSearched]);

  return (
    <SearchContext.Provider
      value={{ query, setQuery, results, setResults, hasSearched, setHasSearched }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearchContext must be used within a SearchProvider");
  return context;
}
