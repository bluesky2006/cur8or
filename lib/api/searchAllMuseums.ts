import { cmaSearchArtworks } from "./cma";
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
          return res;
        } catch (err) {
          console.error("CMA search failed:", err);
          return [];
        }
      })(),
      (async () => {
        try {
          const res = await aicSearchArtworks(query, 1, limit);
          const detailed = await Promise.all(
            res.map(async (item) => {
              try {
                const detail = await aicFetchArtworkById(item.id);
                return { ...item, ...detail };
              } catch (err) {
                console.warn(`AIC detail fetch failed for id ${item.id}`, err);
                return item;
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

    return interleave(cmaResults, aicResults);
  } catch (err) {
    console.error("Museum search failed:", err);
    return [];
  }
}
