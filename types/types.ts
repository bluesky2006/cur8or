export interface Creator {
  id: string | number;
  description?: string;
}

export interface ArtworkImage {
  web?: { url: string };
}

export interface Artwork {
  id: string | number;
  title: string;
  creators: Creator[];
  images?: ArtworkImage;
}

export interface ArtworkItemProps {
  art: Artwork;
}

export interface ArtworkListProps {
  results: Artwork[];
}

export interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}