"use client";

import Image from "next/image";
import { useState } from "react";
import { ArtworkItemProps } from "../types/artTypes";
import ExhibitionArtworkModal from "./ExhibitionArtworkModal";

export default function ExhibitionArtworkItem({ art }: ArtworkItemProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative w-[280px] cursor-pointer group" onClick={() => setShowModal(true)}>
      <div
        className="
      relative isolate
      before:content-[''] before:absolute before:-top-[16%] before:-left-[16%]
      before:w-[132%] before:h-[132%]
      before:bg-gradient-radial from-white to-[#f8f8f8]
      before:shadow-[inset_0_10px_0.5em_rgba(0,0,0,0.25),inset_0.1em_0_0.1em_rgba(0,0,0,0.1),inset_-0.1em_0_0.1em_rgba(0,0,0,0.05),0_0.3em_0.2em_#fff]
      before:-z-10
      after:content-[''] after:absolute after:-top-[22.5%] after:-left-[22.5%]
      after:w-[145%] after:h-[145%]
      after:bg-[#f8f8f8]
      after:shadow-[0_1em_2em_-1em_rgba(0,0,0,0.4),0_2em_2em_-1em_rgba(0,0,0,0.3),0_3em_2em_-1em_rgba(0,0,0,0.2),0_4em_1.5em_-1em_rgba(0,0,0,0.15),0_2em_4em_0.5em_rgba(0,0,0,0.1),inset_0_0.2em_0.1em_#fff]
      after:-z-20
    "
      >
        {art.imageUrl ? (
          <div className="relative">
            <Image
              src={art.imageUrl}
              alt={art.title}
              width={400}
              height={400}
              className="relative block w-[88%] mx-auto bg-white p-[6%] object-contain shadow-[inset_0_0.3em_0.1em_rgba(0,0,0,0.2)]"
            />

            <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-[88%] bg-gray-900/0 group-hover:bg-gray-900/50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 text-center text-white p-4">
              <p className="font-semibold text-lg leading-tight">{art.title}</p>
              <p className="text-sm mt-1">{art.artist}</p>
              <p className="text-xs opacity-80">{art.date}</p>
            </div>
          </div>
        ) : (
          <div className="w-72 h-72 flex items-center justify-center bg-gray-200 text-gray-500 text-sm rounded">
            No Image
          </div>
        )}
      </div>

      {showModal && <ExhibitionArtworkModal art={art} onClose={() => setShowModal(false)} />}
    </div>
  );
}
