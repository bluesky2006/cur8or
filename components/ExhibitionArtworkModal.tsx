"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArtworkItem } from "../types/artTypes";

interface ExhibitionArtworkModalProps {
  exhibition: ArtworkItem[];
  startIndex: number;
  onClose: () => void;
}

export default function ExhibitionArtworkModal({
  exhibition,
  startIndex,
  onClose,
}: ExhibitionArtworkModalProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const art = exhibition[currentIndex];

  const goPrev = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const goNext = () => {
    setCurrentIndex((i) => Math.min(exhibition.length - 1, i + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close artwork view"
        className="absolute top-6 right-8 z-[60] text-white text-4xl hover:scale-110 transition-transform duration-200"
      >
        ×
      </button>

      {/* Counter (top left) */}
      <div className="absolute top-6 left-8 z-[60] text-white text-md font-medium bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
        {currentIndex + 1} / {exhibition.length}
      </div>

      {/* Prev / Next arrows */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous artwork"
          className="absolute left-6 text-white text-5xl font-thin hover:scale-115 transition-transform duration-200 z-[60] cursor-pointer"
        >
          ‹
        </button>
      )}

      {currentIndex < exhibition.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next artwork"
          className="absolute right-6 text-white text-5xl font-thin hover:scale-115 transition-transform duration-200 z-[60] cursor-pointer"
        >
          ›
        </button>
      )}

      <div
        className="relative flex flex-col items-center justify-center w-full h-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {art?.imageUrl ? (
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
