"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import MyExhibitionButton from "./MyExhibitionButton";
import ImageToggle from "./ImageToggle";
import { HeaderProps } from "../types/artTypes";

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
  loading,
}: HeaderProps) {
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
        className={`
          max-w-6xl mx-auto p-4 flex 
          ${
            hasResults
              ? "flex-col lg:flex-row items-center gap-4 sm:gap-4"
              : "flex-col text-center gap-6"
          }
        `}
      >
        <Logo big={!hasResults} resetSearch={resetSearch} hasResults={hasResults} />

        <div
          className={hasResults ? "w-full sm:flex-1 sm:max-w-xl" : "w-full max-w-2xl mx-auto mt-4"}
        >
          <SearchBar
            query={query}
            setQuery={(val: string) => {
              setQuery(val);
              if (val.trim() === "") resetSearch();
            }}
            handleSearch={handleSearch}
            loading={loading}
          />
        </div>

        {hasResults && (
          <div
            className="
              w-full lg:w-auto
              flex flex-wrap justify-center lg:justify-end items-center
              gap-6 mt-3 lg:mt-0 lg:ml-auto
            "
          >
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
