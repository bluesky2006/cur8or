const BASE_URL = "https://openaccess-api.clevelandart.org/api";

export async function cmaGetArtworkById(id: number) {
  const url = `${BASE_URL}/artworks/${id}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function cmaSearchArtworks(query: string, limit = 10) {
  const url = `${BASE_URL}/artworks?limit=${limit}&q=${query}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

// cmaGetArtworkById(130707)
//   .then((artwork) => console.log(artwork, "<artwork"))
//   .catch((error) => console.error(error, "Error yo"));

// cmaSearchArtworks("song xu", 5)
//   .then((response) => console.log(response, "<search response"))
//   .catch((error) => console.error(error));
