import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import TopBar from "../components/TopBar";
import ReactQueryProvider from "../components/ReactQueryProvider"; // ⬅️ New

export const metadata: Metadata = {
  title: "Mind & Method",
  description: "Developed by Anika Anne",
  icons: [{ rel: "icon", url: "/trans.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} w-full overflow-x-hidden`}>
      <body className="min-h-full w-full overflow-x-hidden text-white">
        <div
          className="fixed inset-0 -z-50 h-[10000px] w-screen bg-gradient-to-b from-blue-950 to-purple-950"
          aria-hidden="true"
        />
        <SessionProvider>
          <ReactQueryProvider>
            <TopBar />
            <main className="min-h-full w-full pt-16">{children}</main>
            <footer className="fixed right-4 bottom-4 z-50 text-sm text-white/80">
              © Copyright 2025 Anika Anne. All rights reserved.
            </footer>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
