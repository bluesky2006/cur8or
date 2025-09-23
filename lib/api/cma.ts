import { get } from "http";

const BASE_URL = "https://openaccess-api.clevelandart.org/api";

export async function searchArtworks(query: string, limit = 10) {
  const url = `${BASE_URL}/artworks?limit=${limit}&q=${encodeURIComponent(query)}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function getArtworkById(id: number) {
  const url = `${BASE_URL}/artworks/${id}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

// searchArtworks("monet", 5)
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

// getArtworkById(125234)
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));
