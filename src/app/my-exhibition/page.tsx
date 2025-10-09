"use client";

import ExhibitionArtworkItem from "../../../components/ExhibitionArtworkItem";
import { useExhibition } from "../../../context/ExhibitionContext";
import Link from "next/link";

export default function MyExhibitionPage() {
  const { exhibition } = useExhibition();

  const hasArtworks = exhibition.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="pt-4 px-6 md:px-12">
        <div className="mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 mt-3 text-md font-semibold text-yellow-500 hover:text-yellow-600 transition"
          >
            <span className="relative -top-0.5 text-2xl group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            <span className="max-w-0 opacity-0 overflow-hidden group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out">
              Back
            </span>
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">My Exhibition</h1>
        {!hasArtworks ? (
          <p className="text-gray-700 text-lg">You haven’t added any artworks yet.</p>
        ) : (
          <div className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 -mx-12 px-36">
            <div className="flex gap-60 pb-32 mt-16 items-center min-h-[600px]">
              {exhibition.map((art, index) => (
                <div key={`${art.id}-${index}`} className="flex-shrink-0 pr-12 last:pr-36">
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
