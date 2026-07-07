import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://easymom.in"),
  title: {
    default: "EasyMom Foods — Authentic South Indian Masalas, Made Effortless",
    template: "%s · EasyMom Foods",
  },
  description:
    "Premium authentic South Indian masalas and ready-to-cook blends from Mangalore and Kerala. Homemade taste, fast cooking, trusted by families across India and abroad.",
  keywords: [
    "EasyMom",
    "South Indian masala",
    "Mangalorean recipes",
    "Kerala spices",
    "garam masala",
    "sambar powder",
    "rasam powder",
    "chettinad masala",
    "ready to cook",
    "premium spices India",
  ],
  authors: [{ name: "EasyMom Foods" }],
  creator: "EasyMom Foods",
  publisher: "EasyMom Foods",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "EasyMom Foods — Authentic South Indian Masalas",
    description:
      "Homemade taste of Mangalore and Kerala, crafted into fast-cooking premium masalas.",
    url: "https://easymom.in",
    siteName: "EasyMom Foods",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyMom Foods — Authentic South Indian Masalas",
    description:
      "Homemade taste of Mangalore and Kerala, crafted into fast-cooking premium masalas.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://easymom.in" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EasyMom Foods",
  url: "https://easymom.in",
  description:
    "Premium authentic South Indian masalas and ready-to-cook blends from Mangalore and Kerala.",
  knowsAbout: ["South Indian cuisine", "Masala blends", "Mangalorean recipes", "Kerala spices"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
        <SonnerToaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
