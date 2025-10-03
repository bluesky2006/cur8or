"use client";
import { createContext, useContext, useState } from "react";

type ExhibitionContextType = {
  exhibition: any[];
  addToExhibition: (artwork: any) => void;
  removeFromExhibition: (id: string) => void;
  clearExhibition: () => void;
};

const ExhibitionContext = createContext<ExhibitionContextType | undefined>(undefined);

export function ExhibitionProvider({ children }: { children: React.ReactNode }) {
  const [exhibition, setExhibition] = useState<any[]>([]);

  const addToExhibition = (artwork: any) => {
    setExhibition((prev) => {
      if (prev.some((a) => a.id === artwork.id)) {
        return prev; // prevent duplicates
      }
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
      value={{ exhibition, addToExhibition, removeFromExhibition, clearExhibition }}
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