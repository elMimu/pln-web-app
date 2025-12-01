import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/app/components/Header";
import "./globals.css";
import SearchBar from "./components/SearchBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineScope",
  description: "Discover and explore movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />

        <main className="flex flex-col items-center w-full px-6 py-12 gap-12">
          <div className="w-full max-w-3xl">
            <SearchBar />
          </div>

          <div className="w-full max-w-7xl backdrop-blur-sm bg-white/90 border border-gray-200 shadow-lg rounded-2xl p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

