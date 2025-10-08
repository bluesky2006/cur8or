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
      className={`
        text-yellow-500
        ${hasResults ? "cursor-pointer hover:opacity-80" : "cursor-default"} 
        ${!hasResults ? "text-9xl" : "text-5xl"}
        ${dmSerif.className}
        transition-colors duration-200
      `}
      aria-disabled={!hasResults}
    >
      <h1>cur8or</h1>
    </header>
  );
}
