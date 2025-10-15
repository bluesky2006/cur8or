import { cmaSearchArtworks } from "./cma";
import { cmaToNormalisedArtwork } from "../../lib/adapters/cmaAdapter";
import { aicSearchArtworks, aicFetchArtworkById } from "./aic";
import { aicToNormalisedArtwork } from "../../lib/adapters/aicAdapter";
import type { NormalisedArtwork, AICArtwork, CMAArtwork } from "../../types/artTypes";

function interleave<T>(...arrays: T[][]): T[] {
  const result: T[] = [];
  const maxLength = Math.max(...arrays.map((a) => a.length));
  for (let i = 0; i < maxLength; i++) {
    arrays.forEach((arr) => {
      if (i < arr.length) result.push(arr[i]);
    });
  }
  return result;
}

export async function searchAllMuseums(
  query: string,
  cmaSkip: number,
  limit: number
): Promise<NormalisedArtwork[]> {
  try {
    const [cmaRaw, aicRaw] = await Promise.all([
      (async (): Promise<CMAArtwork[]> => {
        try {
          return await cmaSearchArtworks(query, cmaSkip, limit);
        } catch (err) {
          console.error("CMA search failed:", err);
          return [];
        }
      })(),
      (async (): Promise<AICArtwork[]> => {
        try {
          const res = await aicSearchArtworks(query, 1, limit);

          const detailed = await Promise.all(
            res.map(async (item) => {
              try {
                const detail = await aicFetchArtworkById(item.id);
                const imageUrl = `https://www.artic.edu/iiif/2/${detail.image_id}/full/843,/0/default.jpg`;

                // 🧠 Quick HEAD check to verify image actually exists
                const headRes = await fetch(imageUrl, { method: "HEAD" });
                const contentType = headRes.headers.get("content-type") || "";

                if (!headRes.ok || !contentType.startsWith("image/")) {
                  console.warn(`⚠️ Invalid AIC image for ID ${item.id} (${detail.title})`);
                  return null;
                }

                return { ...item, ...detail, image_url: imageUrl };
              } catch (err) {
                console.warn(`AIC detail fetch failed for id ${item.id}`, err);
                return null;
              }
            })
          );

          // Filter out nulls
          return detailed.filter(Boolean) as AICArtwork[];
        } catch (err) {
          console.error("AIC search failed:", err);
          return [];
        }
      })(),
    ]);

    const cmaResults = cmaRaw.map(cmaToNormalisedArtwork);
    const aicResults = aicRaw.map(aicToNormalisedArtwork);

    // Interleave + dedupe
    const interleaved = interleave(cmaResults, aicResults);
    const deduped = Array.from(new Map(interleaved.map((art) => [art.id, art])).values());

    // Final sanity check: skip empty or non-image URLs
    const withValidImages = deduped.filter(
      (art) => art.imageUrl && art.imageUrl.startsWith("http")
    );

    return withValidImages;
  } catch (err) {
    console.error("Museum search failed:", err);
    return [];
  }
}
