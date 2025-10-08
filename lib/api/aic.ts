import { AICArtwork } from "../../types/artTypes";

const AIC_API = "https://api.artic.edu/api/v1/artworks";

function buildImageUrl(imageId: string): string {
  return `https://www.artic.edu/iiif/2/${imageId}/full/full/0/default.jpg`;
}

export async function aicSearchArtworks(
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<AICArtwork[]> {
  // Build the search URL
  const url = new URL(`${AIC_API}/search`);
  url.searchParams.set("q", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  // Include the fields we care about (especially image_id)
  url.searchParams.set(
    "fields",
    "id,title,artist_display,image_id,date_display,thumbnail,medium_display"
  );

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`AIC API error: ${res.statusText}`);
  }
  const json = await res.json();

  const rawData: any[] = Array.isArray(json.data) ? json.data : [];

  // Filter out artworks without an image_id
  const withImages = rawData.filter((art) => art.image_id && typeof art.image_id === "string");

  // Map into your typed structure, and add image URL
  const mapped: AICArtwork[] = withImages.map((art) => {
    const imageId: string = art.image_id!;
    return {
      id: art.id,
      title: art.title,
      artist_display: art.artist_display,
      date_display: art.date_display,
      medium_display: art.medium_display,
      thumbnail: art.thumbnail, // optional
      image_id: imageId,
      image_url: buildImageUrl(imageId),
    };
  });

  return mapped;
}

// Optional: detail fetcher with extra fields
export async function aicFetchArtworkById(id: number): Promise<AICArtwork> {
  // Add fields you want (like description, provenance, etc.)
  const url = new URL(`${AIC_API}/${id}`);
  url.searchParams.set(
    "fields",
    "id,title,artist_display,image_id,date_display,medium_display,thumbnail,provenance_text,exhibition_history,credit_line"
  );

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`AIC detail fetch failed: ${res.statusText}`);
  }
  const json = await res.json();
  const art = json.data;

  if (!art.image_id) {
    throw new Error("This artwork has no image_id");
  }

  const imageUrl = buildImageUrl(art.image_id);

  const result: AICArtwork = {
    id: art.id,
    title: art.title,
    artist_display: art.artist_display,
    date_display: art.date_display,
    medium_display: art.medium_display,
    thumbnail: art.thumbnail,
    image_id: art.image_id,
    image_url: imageUrl,
    provenance_text: art.provenance_text,
    exhibition_history: art.exhibition_history,
    credit_line: art.credit_line,
  };

  return result;
}
