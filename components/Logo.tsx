import { DM_Serif_Text } from "next/font/google";
import { LogoHeaderProps } from "../types/artTypes";

const dmSerif = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
});

export default function Logo({ resetSearch, hasResults }: LogoHeaderProps) {
  return (
    <header
      onClick={hasResults ? resetSearch : undefined}
      className={`text-amber-500 transition-colors duration-200
        ${hasResults ? "cursor-pointer hover:opacity-80" : "cursor-default"} 
        ${!hasResults ? "text-8xl" : "text-5xl -translate-y-1"}
        ${dmSerif.className}
      `}
      aria-disabled={!hasResults}
    >
      <span>cur8or</span>
    </header>
  );
}
