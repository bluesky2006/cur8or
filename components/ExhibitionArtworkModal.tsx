"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ArtworkDetailModalProps } from "../types/artTypes";

export default function ExhibitionArtworkModal({ art, onClose }: ArtworkDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close artwork view"
        className="absolute top-6 right-8 z-[60] text-white text-4xl font-light hover:scale-110 transition-transform duration-200"
      >
        ×
      </button>

      <div
        className="relative flex flex-col items-center justify-center w-full h-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {art.imageUrl ? (
          <>
            <Image
              src={art.imageUrl}
              alt={art.title || "Artwork"}
              width={2400}
              height={1800}
              className="max-h-[85vh] max-w-[95vw] w-auto h-auto object-contain rounded shadow-2xl transition-transform duration-300 ease-out"
              priority
            />
            <div className="block md:hidden mt-4 text-center text-white">
              <h2 className="font-semibold text-lg leading-tight">{art.title}</h2>
              {art.artist && <p className="text-sm text-white/90">{art.artist}</p>}
              {art.date && <p className="text-sm text-white/80">{art.date}</p>}
            </div>
          </>
        ) : (
          <div className="text-white text-lg">No image available</div>
        )}
      </div>
    </div>
  );
}
