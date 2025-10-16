"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import MyExhibitionButton from "./MyExhibitionButton";
import { useSearchContext } from "../context/SearchContext";
import { searchAllMuseums } from "../lib/api/searchAllMuseums";
import { HeaderProps } from "../types/artTypes";

export default function Header({ hasResults, exhibitionCount, onShowExhibition }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const { query, setQuery, setResults, setHasSearched } = useSearchContext();

  const resetSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    localStorage.removeItem("searchState");
  };

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setResults([]);
    setHasSearched(false);
    localStorage.removeItem("searchState");

    try {
      setLoading(true);
      const newResults = await searchAllMuseums(query, 0, 6);
      setResults(newResults);
      setHasSearched(true);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`${
        hasResults
          ? `fixed top-0 left-0 w-full z-50 bg-[#f9f9f9] dark:bg-[#1a1a1a] ${
              scrolled ? "shadow" : ""
            }`
          : "w-full"
      }`}
    >
      <div
        className={`
          mx-auto flex 
          ${
            hasResults
              ? "flex-col lg:flex-row items-center gap-4 sm:gap-4 max-w-6xl "
              : "flex-col text-center items-center justify-center gap-6 max-w-2xl "
          }
        `}
      >
        {!hasResults && (
          <div className="w-full flex flex-col items-center">
            <Logo resetSearch={resetSearch} hasResults={hasResults} />
            <div className="w-full max-w-[1100px] mx-auto mt-8">
              <SearchBar handleSearch={handleSearch} loading={loading} />
              <p className="text-xs text-gray-100 mt-8 tracking-wide drop-shadow-md text-center">
                Search, explore and curate art from the Art Institute of Chicago and the Cleveland
                Museum of Art.<br></br>(Searches return museum entries with images only.)
              </p>
            </div>
          </div>
        )}
        {hasResults && (
          <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center sm:items-stretch justify-center sm:justify-between gap-4 p-4 text-center">
            <div className="flex-shrink-0">
              <Logo resetSearch={resetSearch} hasResults={hasResults} />
            </div>
            <div className="w-full sm:flex-1 sm:max-w-2xl">
              <SearchBar handleSearch={handleSearch} loading={loading} />
            </div>
            <div className="w-full sm:w-auto mt-2 sm:mt-0">
              <MyExhibitionButton exhibitionCount={exhibitionCount} onClick={onShowExhibition} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
