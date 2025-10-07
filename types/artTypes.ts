// 1. Raw API Types

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
  url: string;
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
  api_link: string;
}

// 2. Normalised Internal Data Model

export type NormalisedArtwork = {
  id: string;
  source: "aic" | "cma";
  title: string;
  artist: string;
  description: string;
  date: string;
  imageUrl: string;
  artworkUrl?: string;
};

// 3. Component Props

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

export interface SearchBarProps {
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
}

export interface ImageToggleProps {
  showWithImagesOnly: boolean;
  setShowWithImagesOnly: (val: boolean) => void;
}

export interface HeaderProps {
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  showWithImagesOnly: boolean;
  setShowWithImagesOnly: (val: boolean) => void;
  hasResults: boolean;
  exhibitionCount: number;
  onShowExhibition: () => void;
  loading: boolean;
}

export interface MyExhibitionButtonProps {
  exhibitionCount: number;
  onClick: () => void;
}

export type LogoHeaderProps = {
  big: boolean;
  resetSearch?: () => void;
  hasResults?: boolean;
};

export type ExhibitionDrawerProps = {
  show: boolean;
  onClose: () => void;
};

// 4. Context Types

export type ExhibitionContextType = {
  exhibition: NormalisedArtwork[];
  addToExhibition: (artwork: NormalisedArtwork) => void;
  removeFromExhibition: (id: string) => void;
  clearExhibition: () => void;
};

export type SearchContextType = {
  query: string;
  setQuery: (q: string) => void;
  results: NormalisedArtwork[];
  setResults: (r: NormalisedArtwork[]) => void;
  hasSearched: boolean;
  setHasSearched: (v: boolean) => void;
};
