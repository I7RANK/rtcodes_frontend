import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RTCodes",
  description: "Let's get the party started",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}
      >
        <Link href="/">
          <button className="mt-3 ml-3 rounded-sm bg-gray-100 px-4 py-2 text-sm">
            Inicio
          </button>
        </Link>
        {children}
        <div className="absolute top-0 -z-10 h-52 w-full bg-linear-to-br from-sky-800 to-sky-950"></div>
      </body>
    </html>
  );
}
