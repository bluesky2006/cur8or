export interface CMAArtwork {
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

export interface AICArtwork {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  image_id: string | null;
  description: string | null;
  thumbnail?: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string | null;
  };
  medium_display: string;
}

export interface ArtworkItemProps {
  art: NormalisedArtwork;
}

export interface ArtworkListProps {
  results: NormalisedArtwork[];
}

export interface ArtworkDetailModalProps {
  art: NormalisedArtwork;
  onClose: () => void;
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

export type ExhibitionContextType = {
  exhibition: NormalisedArtwork[];
  addToExhibition: (artwork: NormalisedArtwork) => void;
  removeFromExhibition: (id: string) => void;
  clearExhibition: () => void;
};
