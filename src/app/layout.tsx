import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import TopBar from "../components/TopBar";
import ReactQueryProvider from "../components/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Mind & Method",
  description: "Developed by Anika Anne",
  icons: [{ rel: "icon", url: "/new2.png" }],
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
            <footer className="mt-2 py-6">
              <div className="container mx-auto text-center">
                <h3 className="mb-6 text-2xl font-bold text-white">
                  Our Socials
                </h3>
                <div className="mb-8 flex justify-center gap-6">
                  <a
                    href="https://www.instagram.com/mindmethodjjhs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-cyan-400 transition-all duration-300 hover:scale-105 hover:bg-cyan-400 hover:text-white"
                  >
                    <svg
                      className="h-7 w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:mindmethodjjhs@gmail.com"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-cyan-400 transition-all duration-300 hover:scale-105 hover:bg-cyan-400 hover:text-white"
                  >
                    <svg
                      className="h-7 w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </footer>
            <div className="fixed right-4 bottom-4">
              <p className="text-sm text-white/80">
                © Copyright 2025 Anika Anne. All rights reserved.
              </p>
            </div>
          </ReactQueryProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
