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
        className="p-4 rounded-lg shadow-xl bg-white flex flex-col cursor-pointer hover:shadow-2xl transition relative"
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
          className={`
    absolute top-6 right-6 rounded z-10 h-8 flex items-center justify-center
    overflow-hidden group transition-all duration-300 ease-in-out
    ${
      alreadyAdded
        ? "bg-red-500 hover:bg-red-600 text-white px-3"
        : "bg-yellow-500 hover:bg-yellow-600 text-white px-3"
    }
  `}
        >
          <span className="shrink-0">{alreadyAdded ? "−" : "+"}</span>
          <span
            className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 
               transition-all duration-300 whitespace-nowrap text-xs"
          >
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
          <h2 className="mt-2 font-semibold line-clamp-2 leading-tight min-h-[2.5rem]">
            {art.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-1">by {art.artist}</p>
          <p className="text-sm text-gray-600">Created {art.date}</p>
          <p className="text-xs text-gray-600">
            Source: {art.source === "cma" ? "Cleveland Art Museum" : "Art Institute of Chicago"}
          </p>
        </div>
      </div>
      {showModal && <ArtworkDetailModal art={art} onClose={() => setShowModal(false)} />}
    </div>
  );
}
