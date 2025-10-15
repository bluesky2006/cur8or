// 1. Raw API Shapes ----------------------------------------------------------

export interface CMAArtwork {
  id: string | number;
  title: string;
  creators: { name?: string; description?: string }[];
  description?: string;
  wall_description?: string;
  creation_date?: string;
  creation_date_earliest?: string;
  images?: { web?: { url: string } };
  url: string;
}

export interface AICArtwork {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  medium_display: string;
  image_id: string;
  image_url: string;

  thumbnail?: {
    lqip?: string;
    width?: number;
    height?: number;
    alt_text?: string | null;
  };

  description?: string | null;
  api_link?: string;
  provenance_text?: string;
  exhibition_history?: string;
  credit_line?: string;
}

// 2. Normalised Internal Model ----------------------------------------------

export type NormalisedArtwork = {
  id: string;
  source: "aic" | "cma";
  title: string;
  artist: string;
  description: string;
  date: string;
  imageUrl: string | null;
  artworkUrl?: string;
};

// 3. Component Props ---------------------------------------------------------

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
  hasResults: boolean;
  exhibitionCount: number;
  onShowExhibition: () => void;
  loading: boolean;
}

export interface MyExhibitionButtonProps {
  exhibitionCount: number;
  onClick: () => void;
}

export type LogoHeaderProps = { resetSearch?: () => void; hasResults?: boolean };
export type ExhibitionDrawerProps = { show: boolean; onClose: () => void };

export type SortableItemProps = {
  art: NormalisedArtwork;
  removeFromExhibition: (id: string) => void; // 👈 match context
};

// 4. Context Types -----------------------------------------------------------

export type ExhibitionContextType = {
  exhibition: NormalisedArtwork[];
  addToExhibition: (artwork: NormalisedArtwork) => void;
  removeFromExhibition: (id: string) => void;
  clearExhibition: () => void;
  setExhibition: React.Dispatch<React.SetStateAction<NormalisedArtwork[]>>;
};

export type SearchContextType = {
  query: string;
  setQuery: (q: string) => void;
  results: NormalisedArtwork[];
  setResults: (r: NormalisedArtwork[]) => void;
  hasSearched: boolean;
  setHasSearched: (v: boolean) => void;
};
