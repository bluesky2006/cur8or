import { LogoHeaderProps } from "../types/artTypes";

export default function LogoHeader({ big, resetSearch }: LogoHeaderProps) {
  return (
    <header
      onClick={resetSearch}
      className={`
  text-yellow-500 font-bold cursor-pointer transition-all duration-300
  hover:text-yellow-600
  ${big ? "text-8xl" : "text-4xl"}
`}
    >
      <p>cur8or</p>
    </header>
  );
}
