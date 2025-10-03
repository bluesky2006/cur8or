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

export type SearchBarProps = {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  showWithImagesOnly: boolean;
  setShowWithImagesOnly: (val: boolean) => void;
};

export type NormalisedArtwork = {
  id: string;
  source: "aic" | "cma";
  title: string;
  artist: string;
  description: string;
  date: string;
  imageUrl: string;
};

export type LogoHeaderProps = {
  big: boolean;
  resetSearch?: () => void;
};

export type ExhibitionDrawerProps = {
  show: boolean;
  onClose: () => void;
};