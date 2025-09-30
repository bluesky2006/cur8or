import { cmaSearchArtworks } from "./cmaSearch";
import { cmaToNormalisedArtwork } from "../../lib/adapters/cmaAdapter";

import { siSearchArtworks } from "./siSearch";
import { siToNormalisedArtwork } from "../../lib/adapters/siAdapter";

import type { NormalisedArtwork } from "../../types/artTypes";

// 🔀 Interleave utility
function interleave<T>(arr1: T[], arr2: T[]): T[] {
  const result: T[] = [];
  const maxLength = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < arr1.length) result.push(arr1[i]);
    if (i < arr2.length) result.push(arr2[i]);
  }

  return result;
}

export async function searchAllMuseums(
  query: string,
  cmaSkip: number,
  siStart: number,
  limit: number
): Promise<NormalisedArtwork[]> {
  try {
    const [cmaRaw, siRaw] = await Promise.all([
      cmaSearchArtworks(query, cmaSkip, limit),
      (async () => {
        try {
          return await siSearchArtworks(query, siStart, limit);
        } catch (err) {
          console.error("SI search failed:", err);
          return [];
        }
      })(),
    ]);

    const cmaResults = cmaRaw.map(cmaToNormalisedArtwork);
    const siResults = siRaw.map(siToNormalisedArtwork);

    console.log("✅ SI results after normalising:", siResults);

    return interleave(cmaResults, siResults); // 🔀 Mix CMA + SI
  } catch (err) {
    console.error("Museum search failed:", err);
    return [];
  }
}
