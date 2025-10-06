import { DM_Serif_Text } from "next/font/google";

import { LogoHeaderProps } from "../types/artTypes";

const dmSerif = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
});

export default function LogoHeader({ big, resetSearch }: LogoHeaderProps) {
  return (
    <header
      onClick={resetSearch}
      className={`
        text-yellow-500 cursor-pointer hover:text-yellow-600
        ${big ? "text-9xl" : "text-5xl"}
        ${dmSerif.className}
      `}
    >
      <p>cur8or</p>
    </header>
  );
}
