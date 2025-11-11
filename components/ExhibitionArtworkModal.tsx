"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { ExhibitionArtworkModalProps } from "../types/artTypes";
import { useExhibition } from "../context/ExhibitionContext";

export default function ExhibitionArtworkModal({
  exhibition,
  startIndex,
  onClose,
}: ExhibitionArtworkModalProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const art = exhibition[currentIndex];
  const { removeFromExhibition } = useExhibition();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(exhibition.length - 1, i + 1));
  }, [exhibition.length]);

  // Handle keyboard shortcuts (Escape, arrows)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goPrev, goNext]);

  // Trap focus inside modal
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ];
    const focusableEls = modal.querySelectorAll<HTMLElement>(focusableSelectors.join(","));
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    // focus first element on open
    firstEl?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (focusableEls.length === 0) return;

      if (e.shiftKey) {
        // shift + tab
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        // tab
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleTab);
    return () => modal.removeEventListener("keydown", handleTab);
  }, []);

  const handleRemove = () => {
    removeFromExhibition(art.id);
    onClose();
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      tabIndex={-1}
    >
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

      <div className="absolute top-6 left-8 z-[60] text-white text-md font-medium bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
        {currentIndex + 1} / {exhibition.length}
      </div>

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
              className="max-h-[80vh] max-w-[95vw] w-auto -translate-y-4 h-auto object-contain rounded shadow-2xl transition-transform duration-300 ease-out"
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

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
          className="absolute bottom-8 z-[60] hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors duration-200"
        >
          Remove from exhibition
        </button>
      </div>
    </div>
  );
}
