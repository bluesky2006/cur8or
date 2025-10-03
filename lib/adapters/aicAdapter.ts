import type { NormalisedArtwork } from "../../types/artTypes";

export function aicToNormalisedArtwork(item: any): NormalisedArtwork {
  return {
    id: `aic-${item.id}`,
    source: "aic",
    title: item.title || "Untitled",
    artist: item.artist_display || "Unknown",
    description:
      item.description || // full record will have this
      item.thumbnail?.alt_text ||
      item.medium_display ||
      "No description available",
    date: item.date_display || "Unknown date",
    imageUrl: item.image_id
      ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
      : "",
  };
}