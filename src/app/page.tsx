"use client";

import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import LogoHeader from "../../components/LogoHeader";
import ArtworkList from "../../components/ArtworkList";
import { useSearchState } from "../../lib/hooks/useSearchState";
import { useExhibition } from "../../context/ExhibitionContext";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const {
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
  } = useSearchState(6);

  const { exhibition, removeFromExhibition } = useExhibition();
  const [showExhibition, setShowExhibition] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <main className="w-full max-w-6xl">
        <div className="w-full">
          <div
            className={`
              flex gap-4 items-center
              ${results.length === 0 ? "flex-col text-center" : "flex-row"}
            `}
          >
            <LogoHeader big={results.length === 0} resetSearch={resetSearch} />
            <div className="w-full max-w-2xl">
              <SearchBar
                query={query}
                setQuery={(val: string) => {
                  setQuery(val);
                  if (val.trim() === "") {
                    resetSearch();
                  }
                }}
                handleSearch={handleSearch}
                showWithImagesOnly={showWithImagesOnly}
                setShowWithImagesOnly={setShowWithImagesOnly}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowExhibition(true)}
              className="ml-auto flex bg-white text-yellow-500 border-2 border-yellow-500 px-6 py-2 rounded 
             hover:bg-yellow-500 hover:text-white transition-colors cursor-pointer"
            >
              My exhibition ({exhibition.length})
            </button>
          </div>
        </div>

        {error && <p className="mt-4 text-red-600">{error}</p>}

        {!loading && hasSearched && results.length === 0 && !error && (
          <p className="mt-6 text-center text-gray-600">No results found for “{query}”.</p>
        )}

        {filteredResults.length > 0 && (
          <p className="mt-6">Showing {filteredResults.length} results</p>
        )}

        <ArtworkList results={filteredResults} />

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

      {/* Exhibition drawer */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-colors duration-300 ${
          showExhibition ? "bg-black/50" : "pointer-events-none bg-transparent"
        }`}
        onClick={() => setShowExhibition(false)}
      >
        <div
          className={`
            relative w-120 max-w-full h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ease-in-out
            ${showExhibition ? "translate-x-0" : "translate-x-full"}
          `}
          onClick={(e) => e.stopPropagation()} // don’t close when clicking inside
        >
          <button
            onClick={() => setShowExhibition(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold mb-4">My Exhibition</h2>

          {exhibition.length === 0 ? (
            <p className="text-gray-600">No artworks added yet.</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                You currently have {exhibition.length} artworks in your exhibition.
              </p>

              <ul className="space-y-4">
                {exhibition.map((art) => (
                  <li
                    key={art.id}
                    className="relative flex items-center border-b border-gray-300 pb-6 gap-3 pt-2 pr-12"
                  >
                    {/* Thumbnail + details */}
                    <div className="flex gap-3">
                      {art.imageUrl ? (
                        <div className="relative w-24 aspect-square flex-shrink-0 rounded overflow-hidden bg-gray-100">
                          <Image src={art.imageUrl} alt={art.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="relative w-24 aspect-square flex-shrink-0 flex items-center justify-center bg-gray-200 text-xs text-gray-500 rounded">
                          No Image
                        </div>
                      )}

                      <div className="flex flex-col justify-between">
                        <p className="font-medium line-clamp-3">{art.title}</p>
                        <p className="text-sm text-gray-600 line-clamp-1">{art.artist}</p>
                      </div>
                    </div>

                    {/* Trash button in top-right */}
                    <button
                      onClick={() => removeFromExhibition(art.id)}
                      className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
