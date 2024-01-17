import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lag gratis QR-koder med logo",
  description:
    "Lag flotte og profesjonelle QR-koder med logo for å markedsføre din bedrift, nettside, eller hva enn du måtte ønske effektivt",
  applicationName: "QR-kode generator",
  authors: { url: "https://stianlarsen.com", name: "Stian Larsen" },
  category: "Productivity",
  classification: "QR-kode generator",
  keywords: [
    "QR-kode",
    "QR-kode generator",
    "QR-kode med logo",
    "QR-kode med bilde",
    "QR-kode med bilde i midten",
    "QR-kode med logo i midten",
    "QR-kode med logo i midten",
    "QR-kode med logo i hjørnet",
    "QR-kode med bilde i hjørnet",
    "QR-kode med logo",
    "qr-code",
    "qr kode generator",
    "generer qr kode gratis",
    "generer qr",
    "qr",
    "code",
    "gratis qr kode",
    "norsk qr kode",
    "engelsk qr kode",
    "qr kode med logo",
    "qr kode generator med logo",
    "qr kode generator for nettsteder",
    "qr kode generator for bedrifter",
    "qr kode generator for markedsføring",
    "qr kode generator for sosiale medier",
  ],
  generator: "Next.js",
  creator: "Stian Larsen",
  publisher: "Stian Larsen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#121212"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
