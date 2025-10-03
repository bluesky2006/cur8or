import type { Metadata } from "next";
import "./globals.css";
import { ExhibitionProvider } from "../../context/ExhibitionContext";

export const metadata: Metadata = {
  title: "cur8or",
  description: "Exhibit your art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ExhibitionProvider>
        <body>{children}</body>
      </ExhibitionProvider>
    </html>
  );
}
