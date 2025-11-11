"use client";

import Image from "next/image";
import { useState } from "react";
import { ArtworkItemProps } from "../types/artTypes";
import ExhibitionArtworkModal from "./ExhibitionArtworkModal";
import { useExhibition } from "../context/ExhibitionContext";

export default function ExhibitionArtworkItem({ art }: ArtworkItemProps) {
  const [showModal, setShowModal] = useState(false);
  const { exhibition } = useExhibition();
  const currentIndex = exhibition.findIndex((a) => a.id === art.id);

  return (
    <div
      className="relative w-[280px] cursor-pointer group"
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View details of ${art.title} by ${art.artist}`}
      onClick={() => setShowModal(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setShowModal(true);
        }
      }}
    >
      <div className="artwork-frame">
        {art.imageUrl ? (
          <div className="relative" role="group" aria-label={`${art.title} by ${art.artist}`}>
            <Image
              src={art.imageUrl}
              alt={`${art.title} by ${art.artist}`}
              width={400}
              height={400}
              className="relative block w-[88%] mx-auto bg-white p-[6%] object-contain shadow-[inset_0_0.3em_0.1em_rgba(0,0,0,0.2)]"
              unoptimized
            />
            <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-[88%] bg-gray-900/0 group-hover:bg-gray-900/50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 text-center text-white p-4">
              <p className="font-semibold text-lg leading-tight text-gray-100">{art.title}</p>
              <p className="text-sm mt-1 text-gray-100">{art.artist}</p>
              <p className="text-xs text-gray-100">{art.date}</p>
            </div>
          </div>
        ) : (
          <div className="w-72 h-72 flex items-center justify-center bg-gray-200 text-gray-500 text-sm rounded">
            No Image
          </div>
        )}
      </div>

      {showModal && (
        <ExhibitionArtworkModal
          exhibition={exhibition}
          startIndex={currentIndex}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
