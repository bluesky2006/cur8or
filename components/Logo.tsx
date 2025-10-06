import { DM_Serif_Text } from "next/font/google";
import { LogoHeaderProps } from "../types/artTypes";

const dmSerif = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
});

export default function Logo({ big, resetSearch, hasResults }: LogoHeaderProps) {
  const isInteractive = !!hasResults;

  return (
    <header
      onClick={isInteractive ? resetSearch : undefined}
      className={`
        text-yellow-500 
        ${isInteractive ? "cursor-pointer hover:text-yellow-600" : "cursor-default"} 
        ${big ? "text-9xl" : "text-5xl"}
        ${dmSerif.className}
        transition-colors duration-200
      `}
      aria-disabled={!isInteractive}
    >
      <h1>cur8or</h1>
    </header>
  );
}
