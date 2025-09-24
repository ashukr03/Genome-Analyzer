// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Genome Analyzer",
  description: "Next.js + Firebase App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 text-gray-900`}
      >
        {/* ✅ Add a global wrapper (like navbar, footer if needed) */}
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
