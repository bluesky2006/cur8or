"use client";

import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useExhibition } from "../context/ExhibitionContext";
import { ExhibitionDrawerProps } from "../types/artTypes";

export default function ExhibitionDrawer({ show, onClose }: ExhibitionDrawerProps) {
  const { exhibition, removeFromExhibition } = useExhibition();

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-colors duration-300 ${
        show ? "bg-black/50" : "pointer-events-none bg-transparent"
      }`}
      onClick={onClose}
    >
      <div
        className={`
          relative w-120 max-w-full h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ease-in-out
          ${show ? "translate-x-0" : "translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">My Exhibition</h2>

        {exhibition.length === 0 ? (
          <p className="text-gray-600">No artworks added yet.</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              You currently have {exhibition.length} artworks in your exhibition.
            </p>

            <ul className="space-y-4">
              {exhibition.map((art) => (
                <li
                  key={art.id}
                  className="relative flex items-center border-b border-gray-300 pb-6 gap-3 pt-2 pr-12"
                >
                  {/* Thumbnail + details */}
                  <div className="flex gap-3">
                    {art.imageUrl ? (
                      <div className="relative w-24 aspect-square flex-shrink-0 rounded overflow-hidden bg-gray-100">
                        <Image src={art.imageUrl} alt={art.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="relative w-24 aspect-square flex-shrink-0 flex items-center justify-center bg-gray-200 text-xs text-gray-500 rounded">
                        No Image
                      </div>
                    )}

                    <div className="flex flex-col justify-between">
                      <p className="font-medium line-clamp-3">{art.title}</p>
                      <p className="text-sm text-gray-600 line-clamp-1">{art.artist}</p>
                    </div>
                  </div>

                  {/* Trash button in top-right */}
                  <button
                    onClick={() => removeFromExhibition(art.id)}
                    className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
