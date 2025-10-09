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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // clicking the backdrop closes
    >
      {/* Fullscreen flexbox, but no click-stop here */}
      <div className="relative flex items-center justify-center w-full h-full p-6">
        {art.imageUrl ? (
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={art.imageUrl}
              alt={art.title || "Artwork"}
              width={2400}
              height={1800}
              className="max-h-[95vh] max-w-[95vw] w-auto h-auto object-contain rounded shadow-2xl transition-transform duration-300 ease-out"
              priority
            />
            <button
              onClick={onClose}
              aria-label="Close artwork view"
              className="absolute top-4 right-4 text-white text-3xl font-normal hover:scale-110 transition-transform duration-200"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="text-white text-lg" onClick={(e) => e.stopPropagation()}>
            No image available
          </div>
        )}
      </div>
    </div>
  );
}
