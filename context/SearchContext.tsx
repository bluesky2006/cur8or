"use client";

import { createContext, useContext, useState } from "react";

type SearchContextType = {
  query: string;
  setQuery: (q: string) => void;
  results: any[];
  setResults: (r: any[]) => void;
  hasSearched: boolean;
  setHasSearched: (v: boolean) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

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
