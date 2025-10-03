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
        onClick={() => setShowModal(true)}
        className="p-4 rounded-lg shadow-xl bg-white flex flex-col cursor-pointer hover:shadow-2xl transition relative"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            alreadyAdded ? removeFromExhibition(art.id) : addToExhibition(art);
          }}
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
               transition-all duration-300 whitespace-nowrap"
          >
            {alreadyAdded ? "Remove from exhibition" : "Add to exhibition"}
          </span>
        </button>
        <div className="w-full aspect-square relative bg-yellow-100 rounded overflow-hidden">
          {art.imageUrl ? (
            <Image src={art.imageUrl} alt={art.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-900 text-sm">
              No image
            </div>
          )}
        </div>
        <h3 className="mt-2 font-semibold line-clamp-2 leading-tight">{art.title}</h3>
        <p className="text-sm text-gray-600">{art.artist}</p>
        <p className="text-sm text-gray-600">{art.date}</p>
        <p className="text-sm text-gray-600">
          Source: {art.source === "cma" ? "Cleveland Art Museum" : "Smithsonian Institute"}
        </p>
      </div>
      {showModal && <ArtworkDetailModal art={art} onClose={() => setShowModal(false)} />}
    </div>
  );
}
