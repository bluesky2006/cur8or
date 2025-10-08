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
          ? `fixed top-0 left-0 w-full z-50 bg-white ${scrolled ? "shadow" : ""}`
          : "w-full"
      }`}
    >
      <div
        className={`
          max-w-6xl mx-auto p-4 flex 
          ${
            hasResults
              ? "flex-col lg:flex-row items-center gap-4 sm:gap-4"
              : "flex-col text-center items-center justify-center gap-6"
          }
        `}
      >
        <Logo big={!hasResults} resetSearch={resetSearch} hasResults={hasResults} />

        {!hasResults && (
          <div className="bg-white/35 backdrop-blur-md shadow-lg mt-4 p-4 rounded-4xl inline-flex items-center justify-center gap-4 mx-auto">
            <div className="w-full max-w-2xl mx-auto">
              <SearchBar handleSearch={handleSearch} loading={loading} />
              <p className="text-sm text-gray-900 mt-8">
                Search, explore and curate artworks from the Art Institute of Chicago and the
                Cleveland Museum of Art.
              </p>
            </div>
          </div>
        )}

        {hasResults && (
          <>
            <div className="w-full sm:flex-1 sm:max-w-xl">
              <SearchBar handleSearch={handleSearch} loading={loading} />
            </div>

            <div
              className="
                w-full lg:w-auto
                flex flex-wrap justify-center lg:justify-end items-center
                gap-6 mt-3 lg:mt-0 lg:ml-auto
              "
            >
              <MyExhibitionButton exhibitionCount={exhibitionCount} onClick={onShowExhibition} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
