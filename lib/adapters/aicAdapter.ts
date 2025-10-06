import type { NormalisedArtwork, AICArtwork } from "../../types/artTypes";

export function aicToNormalisedArtwork(item: AICArtwork): NormalisedArtwork {
  return {
    id: `aic-${item.id}`,
    source: "aic",
    title: item.title || "Untitled",
    artist: item.artist_display || "Unknown",
    description:
      item.description ||
      item.thumbnail?.alt_text ||
      item.medium_display ||
      "No description available",
    date: item.date_display || "Unknown date",
    imageUrl: item.image_id
      ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
      : "",
    artworkUrl: item.api_link
      ? `https://www.artic.edu/artworks/${item.id}`
      : "",
  };
}
