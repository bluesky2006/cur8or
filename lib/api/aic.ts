import { AICArtwork } from "../../types/artTypes";

const AIC_API = "https://api.artic.edu/api/v1/artworks";

// Search endpoint (no description)
export async function aicSearchArtworks(
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<AICArtwork[]> {
  const url = new URL(`${AIC_API}/search`);
  url.searchParams.set("q", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set(
    "fields",
    "id,title,artist_display,image_id,date_display,thumbnail,medium_display"
  );

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`AIC API error: ${res.statusText}`);
  }

  const data = await res.json();
  return data.data;
}

// Detail endpoint (add description if available)
export async function aicFetchArtworkById(id: number) {
  const res = await fetch(`${AIC_API}/${id}`);
  if (!res.ok) throw new Error(`AIC detail fetch failed: ${res.statusText}`);
  const data = await res.json();
  return data.data;
}
