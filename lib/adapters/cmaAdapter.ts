import type { CMAArtwork, NormalisedArtwork } from "../../types/artTypes.js";

export function cmaToNormalisedArtwork(item: CMAArtwork): NormalisedArtwork {
  return {
    id: item.id?.toString() || "unknown-id",
    source: "cma",
    title: item.title || "Untitled",
    artist: item.creators?.[0]?.description || item.creators?.[0]?.name || "Unknown",
    description: item.wall_description || item.description || "No description available",
    date: item.creation_date || item.creation_date_earliest || "Unknown date",
    imageUrl: item.images?.web?.url || null,
    artworkUrl: item.url || `https://www.clevelandart.org/art/${item.id}`,
  };
}
