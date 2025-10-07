import type { Metadata } from "next";
import "./globals.css";
import { ExhibitionProvider } from "../../context/ExhibitionContext";
import { SearchProvider } from "../../context/SearchContext";

export const metadata: Metadata = {
  title: "Cur8or",
  description: "Curate your own virtual art exhibitions",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ExhibitionProvider>
        <SearchProvider>
          <body>{children}</body>
        </SearchProvider>
      </ExhibitionProvider>
    </html>
  );
}
