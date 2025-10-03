import { cmaSearchArtworks } from "./cmaSearch";
import { cmaToNormalisedArtwork } from "../../lib/adapters/cmaAdapter";

import { aicSearchArtworks, aicFetchArtworkById } from "./aic";
import { aicToNormalisedArtwork } from "../../lib/adapters/aicAdapter";

import type { NormalisedArtwork } from "../../types/artTypes";

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
      (async () => {
        try {
          const res = await cmaSearchArtworks(query, cmaSkip, limit);
          console.log("✅ Raw CMA data (first item):", res[0]);
          return res;
        } catch (err) {
          console.error("CMA search failed:", err);
          return [];
        }
      })(),
      (async () => {
        try {
          const res = await aicSearchArtworks(query, 1, limit);
          console.log("✅ Raw AIC data (first item):", res[0]);

          // fetch full details for each ID to enrich with description
          const detailed = await Promise.all(
            res.map(async (item) => {
              try {
                const detail = await aicFetchArtworkById(item.id);
                return { ...item, ...detail }; // merge shallow search + detail
              } catch (err) {
                console.warn(`⚠️ AIC detail fetch failed for id ${item.id}`, err);
                return item; // fallback to search result only
              }
            })
          );

          return detailed;
        } catch (err) {
          console.error("AIC search failed:", err);
          return [];
        }
      })(),
    ]);

    const cmaResults = cmaRaw.map(cmaToNormalisedArtwork);
    const aicResults = aicRaw.map(aicToNormalisedArtwork);

    console.log("🎨 Normalised CMA (first item):", cmaResults[0]);
    console.log("🎨 Normalised AIC (first item):", aicResults[0]);

    return interleave(cmaResults, aicResults);
  } catch (err) {
    console.error("Museum search failed:", err);
    return [];
  }
}
