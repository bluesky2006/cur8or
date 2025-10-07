"use client";

import ArtworkItem from "../../../components/ArtworkItem";
import { useExhibition } from "../../../context/ExhibitionContext";
import Link from "next/link";

export default function MyExhibitionPage() {
  const { exhibition } = useExhibition();

  const hasArtworks = exhibition.length > 0;

  return (
    <div className="min-h-screen pt-8 pb-16 px-6 md:px-12">
      <div className="mb-8">
        <Link
          href="/"
          className="mt-3 inline-block text-center text-md font-semibold rounded py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          ← Back to Search
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-900">My Exhibition</h1>

      {!hasArtworks ? (
        <p className="text-gray-700 text-lg">You haven’t added any artworks yet.</p>
      ) : (
        <div className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 -mx-6 px-6">
          <div className="flex gap-6 pb-16">
            {exhibition.map((art, index) => (
              <div key={`${art.id}-${index}`} className="flex-shrink-0 w-72 snap-start">
                <ArtworkItem art={art} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
