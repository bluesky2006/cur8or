import type { NormalisedArtwork } from "../../types/artTypes.js";

export function siToNormalisedArtwork(item: any): NormalisedArtwork {
  console.log(item, "siAdapter");
  const content = item.content || {};

  const title = item.title || content.title || "Untitled";
  const id = item.id || item.url || "unknown-id";

  const artist =
    content.freetext?.name?.[0]?.content ||
    content.freetext?.creator?.[0]?.content ||
    content.freetext?.maker?.[0]?.content ||
    content.freetext?.author?.[0]?.content ||
    "Unknown";

  const description =
    content.freetext?.notes?.[0]?.content ||
    content.freetext?.description?.[0]?.content ||
    "No description available";

  const date =
    content.freetext?.date?.[0]?.content || content.indexedStructured?.date?.[0] || "Unknown date";

  const mediaList = content.descriptiveNonRepeating?.online_media?.media || [];

  const media = mediaList.length > 0 ? mediaList[0] : null;

  const imageUrl = media?.content || media?.thumbnail || "";

  return {
    id,
    source: "si",
    title,
    artist,
    description,
    date,
    imageUrl,
  };
}
