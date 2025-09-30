const BASE_URL = "https://api.si.edu/openaccess/api/v1.0";
const API_KEY = process.env.NEXT_PUBLIC_SMITHSONIAN_API_KEY;

export async function siSearchArtworks(query: string, start = 0, rows = 9) {
  const searchUrl = `${BASE_URL}/search?api_key=${API_KEY}&start=${start}&rows=${rows}&q=${encodeURIComponent(
    query
  )}`;
  const searchRes = await fetch(searchUrl);

  if (!searchRes.ok) {
    throw new Error(`API search error: ${searchRes.status}`);
  }

  const searchJson = await searchRes.json();
  const baseRows = searchJson.response?.rows || [];

  const detailedResults = await Promise.all(
    baseRows.map(async (item: any) => {
      try {
        const contentUrl = `${BASE_URL}/content/${item.id}?api_key=${API_KEY}`;
        const contentRes = await fetch(contentUrl);
        if (!contentRes.ok) throw new Error(`API content fetch failed: ${contentRes.status}`);
        const contentJson = await contentRes.json();
        return contentJson.response;
      } catch (error) {
        console.warn(`Failed to fetch content for ${item.id}:`, error);
        return null;
      }
    })
  );

  return detailedResults.filter(Boolean);
}
