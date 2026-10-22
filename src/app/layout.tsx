import type { Metadata } from "next";
import "./globals.css";
import UniversityAutocompleteEnhancer from "@/components/university-autocomplete-enhancer";

export const metadata: Metadata = {
  title: "Pathway AI",
  description: "AI-powered study abroad and career planning platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <UniversityAutocompleteEnhancer />
        {children}
      </body>
    </html>
  );
}
