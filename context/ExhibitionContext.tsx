"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { ExhibitionContextType, NormalisedArtwork } from "../types/artTypes";

const ExhibitionContext = createContext<ExhibitionContextType | undefined>(undefined);

export function ExhibitionProvider({ children }: { children: React.ReactNode }) {
  const [exhibition, setExhibition] = useState<NormalisedArtwork[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("exhibition");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as NormalisedArtwork[];
        setExhibition(parsed);
      } catch (err) {
        console.error("Failed to parse saved exhibition:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("exhibition", JSON.stringify(exhibition));
  }, [exhibition]);

  const addToExhibition = (artwork: NormalisedArtwork) => {
    setExhibition((prev) => {
      if (prev.some((a) => a.id === artwork.id)) return prev;
      return [...prev, artwork];
    });
  };

  const removeFromExhibition = (id: string) => {
    setExhibition((prev) => prev.filter((a) => a.id !== id));
  };

  const clearExhibition = () => {
    setExhibition([]);
  };

  return (
    <ExhibitionContext.Provider
      value={{
        exhibition,
        addToExhibition,
        removeFromExhibition,
        clearExhibition,
        setExhibition, // 👈 add this line
      }}
    >
      {children}
    </ExhibitionContext.Provider>
  );
}

export function useExhibition() {
  const context = useContext(ExhibitionContext);
  if (!context) throw new Error("useExhibition must be used within an ExhibitionProvider");
  return context;
}
