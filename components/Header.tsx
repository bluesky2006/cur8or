"use client";

import { useEffect, useState } from "react";
import LogoHeader from "./Logo";
import SearchBar from "./SearchBar";
import MyExhibitionButton from "./MyExhibitionButton";
import ImageToggle from "./ImageToggle";

export default function Header({
  query,
  setQuery,
  handleSearch,
  showWithImagesOnly,
  setShowWithImagesOnly,
  resetSearch,
  hasResults,
  exhibitionCount,
  onShowExhibition,
}: {
  query: string;
  setQuery: (val: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  showWithImagesOnly: boolean;
  setShowWithImagesOnly: (val: boolean) => void;
  resetSearch: () => void;
  hasResults: boolean;
  exhibitionCount: number;
  onShowExhibition: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

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
        className={`max-w-6xl mx-auto flex items-center gap-6 p-4 ${
          !hasResults ? "flex-col text-center" : "flex-row"
        }`}
      >
        {/* Logo */}
        <LogoHeader big={!hasResults} resetSearch={resetSearch} />

        {/* Search Bar with conditional width */}
        <div
          className={
            hasResults ? "flex-1 max-w-xl" : "w-full max-w-2xl mx-auto" // much wider on initial view
          }
        >
          <SearchBar
            query={query}
            setQuery={(val: string) => {
              setQuery(val);
              if (val.trim() === "") resetSearch();
            }}
            handleSearch={handleSearch}
          />
        </div>

        {/* Right-side controls only when results are present */}
        {hasResults && (
          <div className="flex items-center gap-6 ml-auto">
            <ImageToggle
              showWithImagesOnly={showWithImagesOnly}
              setShowWithImagesOnly={setShowWithImagesOnly}
            />
            <MyExhibitionButton exhibitionCount={exhibitionCount} onClick={onShowExhibition} />
          </div>
        )}
      </div>
    </div>
  );
}
