"use client";

import ExhibitionArtworkItem from "../../../components/ExhibitionArtworkItem";
import { useExhibition } from "../../../context/ExhibitionContext";
import Link from "next/link";

export default function MyExhibitionPage() {
  const { exhibition } = useExhibition();

  const hasArtworks = exhibition.length > 0;

  return (
    <div
      className="
        min-h-screen flex flex-col 
        bg-gray-100 dark:bg-[#1a1a1a]
        text-gray-900 dark:text-gray-100
        transition-colors duration-700
      "
    >
      {" "}
      <div className="pt-4 px-6 md:px-12">
        <div className="mb-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 mt-3 text-md font-semibold text-amber-500 hover:text-amber-600 transition"
          >
            <span className="relative -top-0.5 text-2xl group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            <span className="max-w-0 opacity-0 overflow-hidden group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out">
              Back
            </span>
          </Link>
        </div>
        <h1
          className="text-2xl font-bold         text-gray-900 dark:text-gray-100
 pb-8 border-b-2 border-gray-200"
        >
          My Exhibition
        </h1>
        {!hasArtworks ? (
          <p className="text-lg">You haven’t added any artworks yet.</p>
        ) : (
          <div className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 -mx-12 px-36">
            <div className="flex gap-60 pb-32 items-center min-h-[calc(100vh-160px)] pt-12">
              {exhibition.map((art, index) => (
                <div key={`${art.id}-${index}`} className="flex-shrink-0 pr-4 last:pr-36">
                  <ExhibitionArtworkItem art={art} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
