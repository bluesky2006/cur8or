import { AICArtwork } from "../../types/artTypes";

const AIC_API = "https://api.artic.edu/api/v1/artworks";

function buildImageUrl(imageId: string): string {
  return `https://www.artic.edu/iiif/2/${imageId}/full/full/0/default.jpg`;
}

export async function aicSearchArtworks(
  query: string,
  page = 1,
  limit = 10
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
  if (!res.ok) throw new Error(`AIC API error: ${res.statusText}`);

  const json = await res.json();

  const rawData = (Array.isArray(json.data) ? json.data : []) as {
    id: number;
    title: string;
    artist_display: string;
    image_id: string | null;
    date_display: string;
    medium_display: string;
    thumbnail?: AICArtwork["thumbnail"];
  }[];

  const cleanQuery = query.trim().toLowerCase();

  const strictMatches = rawData.filter((art) => {
    const title = art.title?.toLowerCase() || "";
    const artist = art.artist_display?.toLowerCase() || "";
    return title.split(/\b/).includes(cleanQuery) || artist.split(/\b/).includes(cleanQuery);
  });

  return strictMatches
    .filter((art) => art.image_id)
    .map((art) => ({
      id: art.id,
      title: art.title,
      artist_display: art.artist_display,
      date_display: art.date_display,
      medium_display: art.medium_display,
      thumbnail: art.thumbnail,
      image_id: art.image_id!,
      image_url: buildImageUrl(art.image_id!),
    }));
}

export async function aicFetchArtworkById(id: number): Promise<AICArtwork> {
  const url = new URL(`${AIC_API}/${id}`);
  url.searchParams.set(
    "fields",
    "id,title,artist_display,image_id,date_display,medium_display,thumbnail,provenance_text,exhibition_history,credit_line"
  );

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`AIC detail fetch failed: ${res.statusText}`);

  const { data: art } = (await res.json()) as {
    data: {
      id: number;
      title: string;
      artist_display: string;
      date_display: string;
      medium_display: string;
      image_id: string | null;
      thumbnail?: AICArtwork["thumbnail"];
      provenance_text?: string;
      exhibition_history?: string;
      credit_line?: string;
    };
  };

  if (!art.image_id) throw new Error("This artwork has no image_id");

  return {
    id: art.id,
    title: art.title,
    artist_display: art.artist_display,
    date_display: art.date_display,
    medium_display: art.medium_display,
    thumbnail: art.thumbnail,
    image_id: art.image_id,
    image_url: buildImageUrl(art.image_id),
    provenance_text: art.provenance_text,
    exhibition_history: art.exhibition_history,
    credit_line: art.credit_line,
  };
}
