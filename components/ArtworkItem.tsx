import Image from "next/image";
import type { ArtworkItemProps } from "../types/artTypes";
import ArtworkDetailModal from "./ArtworkDetailModal";
import { useState } from "react";

export default function ArtworkItem({ art }: ArtworkItemProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div
        onClick={() => setShowModal(true)}
        className="p-4 rounded-lg shadow-xl bg-white flex flex-col cursor-pointer hover:shadow-2xl transition relative"
      >
        <div
          className="absolute top-6 right-6 bg-yellow-500 text-white rounded 
             z-10 h-8 w-8 transition-all duration-300 ease-in-out 
             hover:w-40 cursor-pointer overflow-hidden group 
             flex items-center justify-center"
        >
          <span className="shrink-0">+</span>
          <span
            className="hidden group-hover:inline-block whitespace-nowrap ml-2 
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Add to exhibition
          </span>
        </div>
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
