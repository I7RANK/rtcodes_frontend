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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("ping");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ping`);
  console.log(`(\x1b[32m${res.status}\x1b[0m) ${await res.text()}`);
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative flex min-h-screen flex-col antialiased`}
      >
        <main className="flex-1">
          <Link href="/">
            <button className="mt-3 ml-3 rounded-sm bg-gray-100 px-4 py-2 text-sm">
              Inicio
            </button>
          </Link>
          {children}
          <div className="absolute top-0 -z-10 h-52 w-full bg-linear-to-br from-sky-800 to-sky-950"></div>
        </main>

        <footer className="mt-10 h-20 w-full bg-linear-to-br from-sky-950 to-sky-800"></footer>
      </body>
    </html>
  );
}
