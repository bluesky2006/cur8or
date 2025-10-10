"use client";
import { MyExhibitionButtonProps } from "../types/artTypes";

export default function MyExhibitionButton({ exhibitionCount, onClick }: MyExhibitionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-auto flex bg-white text-amber-500 border border-amber-500 px-6 py-2 rounded 
        hover:bg-amber-500 hover:text-white transition-colors cursor-pointer dark:bg-black"
    >
      My Exhibition {exhibitionCount > 0 ? `(${exhibitionCount})` : null}
    </button>
  );
}
