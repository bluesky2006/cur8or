import Image from "next/image";
import { useExhibition } from "../context/ExhibitionContext";
import { ArtworkDetailModalProps } from "../types/artTypes";
import { useEffect, useRef } from "react";

export default function ArtworkDetailModal({ art, onClose }: ArtworkDetailModalProps) {
  const { exhibition, addToExhibition, removeFromExhibition } = useExhibition();
  const descRef = useRef<HTMLDivElement | null>(null);

  const alreadyAdded = exhibition.some((a) => a.id === art.id);

  useEffect(() => {
    if (!descRef.current) return;
    const links = descRef.current.querySelectorAll("a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }, [art.description]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`title-${art.id}`}
      aria-describedby={`desc-${art.id}`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-3xl w-full h-[80vh] overflow-hidden flex relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close artwork details"
          className="absolute top-2 right-3 py-2 px-3 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <div className="w-1/2 relative bg-yellow-100">
          {art.imageUrl ? (
            <Image src={art.imageUrl} alt={art.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-900 text-sm">
              No image
            </div>
          )}
        </div>
        <div className="w-1/2 p-6 flex flex-col overflow-y-auto">
          <h3 id={`title-${art.id}`} className="text-xl font-semibold mb-2 leading-snug">
            {art.title}
          </h3>
          <p className="text-sm text-gray-700 mb-1">{art.artist}</p>
          <p className="text-sm text-gray-500 mb-4 pb-2 border-b border-gray-300">{art.date}</p>
          <div
            id={`desc-${art.id}`}
            ref={descRef}
            className="text-sm text-gray-600 [&>p]:mb-4 [&_a]:font-bold [&_a]:text-blue-800 [&_a:hover]:text-blue-900"
            dangerouslySetInnerHTML={{ __html: art.description }}
          />
          {alreadyAdded ? (
            <button
              onClick={() => removeFromExhibition(art.id)}
              aria-label={`Remove ${art.title} from exhibition`}
              className="mt-4 text-md font-semibold rounded py-2 bg-red-500 text-white hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400"
            >
              Remove from exhibition
            </button>
          ) : (
            <button
              onClick={() => addToExhibition(art)}
              aria-label={`Add ${art.title} to exhibition`}
              className="mt-4 text-md font-semibold rounded py-2 bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Add to exhibition
            </button>
          )}
          {art.artworkUrl && (
            <a
              href={art.artworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-center text-md font-semibold rounded py-2 bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Find out more →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
