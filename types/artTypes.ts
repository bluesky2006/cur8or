export interface CmaArtwork {
  id: string | number;
  title: string;
  creators: {
    description?: string;
    name?: string;
  }[];
  description?: string;
  wall_description?: string;
  creation_date?: string;
  creation_date_earliest?: string;
  images?: {
    web?: {
      url: string;
    };
  };
}

export interface ArtworkItemProps {
  art: NormalisedArtwork;
}

export interface ArtworkListProps {
  results: NormalisedArtwork[];
}

export interface SearchBarProps {
  query: string;
  setQuery: (val: string) => void; // simpler
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type NormalisedArtwork = {
  id: string;
  source: "si" | "cma";
  title: string;
  artist: string;
  description: string;
  date: string;
  imageUrl: string;
};
