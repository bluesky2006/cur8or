"use client";

export default function MyExhibitionButton({
  exhibitionCount,
  onClick,
}: {
  exhibitionCount: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-auto flex bg-white text-yellow-500 border border-yellow-500 px-6 py-2 rounded 
        hover:bg-yellow-500 hover:text-white transition-colors cursor-pointer"
    >
      My Exhibition ({exhibitionCount})
    </button>
  );
}
