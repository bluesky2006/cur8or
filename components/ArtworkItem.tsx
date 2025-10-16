import Image from "next/image";
import type { ArtworkItemProps } from "../types/artTypes";
import ArtworkDetailModal from "./ArtworkDetailModal";
import { useState } from "react";
import { useExhibition } from "../context/ExhibitionContext";

export default function ArtworkItem({ art }: ArtworkItemProps) {
  const [showModal, setShowModal] = useState(false);
  const { exhibition, addToExhibition, removeFromExhibition } = useExhibition();

  const alreadyAdded = exhibition.some((a) => a.id === art.id);

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setShowModal(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowModal(true);
          }
        }}
        aria-label={`View details of ${art.title} by ${art.artist}`}
        className="p-4 rounded-lg shadow-xl bg-white flex flex-col cursor-pointer  transition hover:-translate-y-1 relative"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (alreadyAdded) {
              removeFromExhibition(art.id);
            } else {
              addToExhibition(art);
            }
          }}
          aria-label={
            alreadyAdded ? `Remove ${art.title} from exhibition` : `Add ${art.title} to exhibition`
          }
          className={`absolute top-6 right-6 rounded z-10 inline-flex items-center justify-center overflow-hidden group transition-all duration-300 ease-in-out py-2 px-3 sm:pl-3 sm:group-hover:pr-3

    ${
      alreadyAdded
        ? "bg-red-500 hover:bg-red-600 text-white"
        : "bg-amber-500 hover:bg-amber-600 text-white"
    }
  `}
        >
          <span className="shrink-0 leading-none">{alreadyAdded ? "−" : "+"}</span>

          <span className="whitespace-nowrap leading-none text-sm sm:text-xs ml-2 sm:ml-0 sm:max-w-0 sm:overflow-hidden sm:group-hover:max-w-xs sm:group-hover:ml-2 sm:transition-all sm:duration-300">
            {alreadyAdded ? "Remove from exhibition" : "Add to exhibition"}
          </span>
        </button>
        <div className="w-full aspect-square relative bg-gray-100 rounded overflow-hidden">
          {art.imageUrl ? (
            <Image
              src={art.imageUrl}
              alt={`${art.title} by ${art.artist}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-900 text-sm">
              No image
            </div>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <h1>{art.title}</h1>
          <h4 className="line-clamp-1">by {art.artist}</h4>
          <p>Created {art.date}</p>
          <p className="text-xs">
            Source: {art.source === "cma" ? "Cleveland Art Museum" : "Art Institute of Chicago"}
          </p>
        </div>
      </div>
      {showModal && <ArtworkDetailModal art={art} onClose={() => setShowModal(false)} />}
    </div>
  );
}
