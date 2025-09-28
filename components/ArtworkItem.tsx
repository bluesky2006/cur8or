// components/ArtworkItem.tsx
import Image from "next/image";
import type { ArtworkItemProps } from "../types/types";

export default function ArtworkItem({ art }: ArtworkItemProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white flex flex-col">
      <div className="w-full aspect-square relative bg-gray-200 rounded overflow-hidden">
        {art.images?.web?.url ? (
          <Image src={art.images.web.url} alt={art.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      <h3 className="mt-2 font-semibold">{art.title}</h3>
      <p className="text-sm text-gray-600">{art.creators.map((c) => c.description).join(", ")}</p>
    </div>
  );
}
