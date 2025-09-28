import type { ArtworkListProps } from "../types/types";
import ArtworkItem from "./ArtworkItem";

export default function ArtworkList({ results }: ArtworkListProps) {
  if (results.length === 0) return null;

  return (
    <ul className="mt-4 space-y-2">
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.map((art) => (
          <ArtworkItem key={art.id} art={art} />
        ))}
      </div>
    </ul>
  );
}
