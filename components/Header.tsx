"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import MyExhibitionButton from "./MyExhibitionButton";
import { useSearchContext } from "../context/SearchContext";
import { HeaderProps } from "../types/artTypes";

export default function Header({
  handleSearch,
  hasResults,
  exhibitionCount,
  onShowExhibition,
  loading,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { setQuery, setResults, setHasSearched } = useSearchContext();

  const resetSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    localStorage.removeItem("searchState");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`${
        hasResults
          ? `fixed top-0 left-0 w-full z-50 bg-white dark:bg-black ${scrolled ? "shadow" : ""}`
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
                Museum of Art.
              </p>
            </div>
          </div>
        )}
        {hasResults && (
          <div className="w-full flex items-center justify-between gap-4 p-4">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Logo resetSearch={resetSearch} hasResults={hasResults} />
            </div>

            {/* Center: Search bar */}
            <div className="flex-1 max-w-xl">
              <SearchBar handleSearch={handleSearch} loading={loading} />
            </div>

            {/* Right: My Exhibition button */}
            <div className="flex-shrink-0">
              <MyExhibitionButton exhibitionCount={exhibitionCount} onClick={onShowExhibition} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
