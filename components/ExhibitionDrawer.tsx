"use client";

import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useExhibition } from "../context/ExhibitionContext";
import { ExhibitionDrawerProps } from "../types/artTypes";
import Link from "next/link";

export default function ExhibitionDrawer({ show, onClose }: ExhibitionDrawerProps) {
  const { exhibition, removeFromExhibition, clearExhibition } = useExhibition();

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-colors duration-300 ${
        show ? "bg-black/50" : "pointer-events-none bg-transparent"
      }`}
      onClick={onClose}
    >
      <div
        className={`
          relative w-120 max-w-full h-full bg-white shadow-lg flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${show ? "translate-x-0" : "translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-3 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-semibold">My Exhibition</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 overscroll-contain">
          {exhibition.length === 0 ? (
            <p className="text-gray-600 mt-2">No artworks added yet.</p>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                You currently have {exhibition.length}{" "}
                {exhibition.length === 1 ? "artwork" : "artworks"} in your exhibition.
              </p>

              <ul className="space-y-4">
                {exhibition.map((art) => (
                  <li
                    key={art.id}
                    className="relative flex items-center border-b border-gray-300 pb-6 gap-3 pt-2 pr-12"
                  >
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

                    <button
                      onClick={() => removeFromExhibition(art.id)}
                      className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {exhibition.length > 0 && (
          <div className="flex-shrink-0 bg-white px-6 p-6 flex justify-between items-center gap-4">
            <button
              onClick={clearExhibition}
              className="flex-1 text-md font-semibold rounded py-2 px-4 bg-red-500 text-white hover:bg-red-600 cursor-pointer text-center"
            >
              Remove all exhibits
            </button>

            <Link
              href="/my-exhibition"
              className="flex-1 text-md font-semibold rounded py-2 px-4 bg-yellow-500 text-white hover:bg-yellow-600 text-center"
              onClick={onClose}
            >
              View Full Exhibition →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
