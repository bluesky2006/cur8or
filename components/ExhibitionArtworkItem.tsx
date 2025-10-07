"use client";

import Image from "next/image";
import { useState } from "react";
import { ArtworkItemProps } from "../types/artTypes";
import ArtworkDetailModal from "./ArtworkDetailModal";

export default function ExhibitionArtworkItem({ art }: ArtworkItemProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-sm"
      onClick={() => setShowModal(true)}
    >
      {art.imageUrl ? (
        <div className="transition-transform duration-300 group-hover:scale-[1.02]">
          <Image
            src={art.imageUrl}
            alt={art.title}
            width={400}
            height={400}
            className="object-contain max-h-[80vh] mx-auto shadow-lg"
          />
        </div>
      ) : (
        <div className="w-72 h-72 flex items-center justify-center bg-gray-200 text-gray-500 text-sm rounded">
          No Image
        </div>
      )}

      <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 text-center text-white p-4">
        <p className="font-semibold text-lg leading-tight">{art.title}</p>
        <p className="text-sm mt-1">{art.artist}</p>
        <p className="text-xs opacity-80">{art.date}</p>
      </div>

      {showModal && <ArtworkDetailModal art={art} onClose={() => setShowModal(false)} />}
    </div>
  );
}
