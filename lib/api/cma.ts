import { CMAArtwork } from "../../types/artTypes";

const BASE_URL = "https://openaccess-api.clevelandart.org/api";

export async function cmaSearchArtworks(query: string, skip = 0, limit = 6): Promise<CMAArtwork[]> {
  const res = await fetch(
    `${BASE_URL}/artworks?limit=${limit}&skip=${skip}&q=${encodeURIComponent(query)}`
  );
  const json = await res.json();

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return (Array.isArray(json.data) ? json.data : []) as CMAArtwork[];
}
