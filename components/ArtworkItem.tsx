import Image from "next/image";
import type { ArtworkItemProps } from "../types/artTypes";

export default function ArtworkItem({ art }: ArtworkItemProps) {
  console.log("ArtworkItem", art);
  return (
    <div className="p-4  rounded-lg shadow-xl bg-white flex flex-col">
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
  );
}
