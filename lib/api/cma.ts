import { CMAArtwork } from "../../types/artTypes";

const BASE_URL = "https://openaccess-api.clevelandart.org/api";

export async function cmaSearchArtworks(query: string, skip = 0, limit = 6): Promise<CMAArtwork[]> {
  const url = `${BASE_URL}/artworks?limit=${limit}&skip=${skip}&q=${encodeURIComponent(
    query
  )}&has_image=1`;

  const res = await fetch(url);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(`CMA API error: ${res.status}`);
  }

  const data = Array.isArray(json.data) ? json.data : [];
  const withImages = data.filter((art: CMAArtwork) => !!art.images?.web?.url);

  return withImages;
}
