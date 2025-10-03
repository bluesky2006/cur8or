"use client";

import { useEffect, useState } from "react";
import LogoHeader from "./LogoHeader";
import SearchBar from "./SearchBar";
import MyExhibitionButton from "./MyExhibitionButton";

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
        className={`max-w-6xl mx-auto flex gap-4 items-center p-4
          ${!hasResults ? "flex-col text-center" : "flex-row"}
        `}
      >
        <LogoHeader big={!hasResults} resetSearch={resetSearch} />
        <div className="w-full max-w-2xl">
          <SearchBar
            query={query}
            setQuery={(val: string) => {
              setQuery(val);
              if (val.trim() === "") resetSearch();
            }}
            handleSearch={handleSearch}
            showWithImagesOnly={showWithImagesOnly}
            setShowWithImagesOnly={setShowWithImagesOnly}
          />
        </div>
        {hasResults && (
          <MyExhibitionButton exhibitionCount={exhibitionCount} onClick={onShowExhibition} />
        )}
      </div>
    </div>
  );
}
