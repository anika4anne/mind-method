"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Interest", href: "/interest" },
  { label: "Officers", href: "/officers" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact-us" },
  { label: "About Us", href: "/about" },
];

export default function TopBar({ className = "" }: { className?: string }) {
  const session = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-out",
        scrolled
          ? "border-b border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl"
          : "bg-transparent",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-black/90">
                  <span className="text-lg font-bold text-white">M</span>
                </div>
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 blur-sm" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">
                Mind & Method
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 md:flex">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "relative rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-white/5 hover:text-white",
                  pathname === href && "bg-white/10 text-white",
                )}
              >
                {label}
                {pathname === href && (
                  <div className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                )}
              </Link>
            ))}
          </nav>

          {/* Auth Button */}
          <div className="flex items-center space-x-4">
            {session.status === "loading" ? (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            ) : session.status === "authenticated" ? (
              <button
                onClick={() => signOut()}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span className="relative z-10">Sign Out</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative rounded-lg bg-white/5 p-2 transition-colors duration-200 hover:bg-white/10 md:hidden"
            >
              <div className="flex flex-col space-y-1">
                <div
                  className={clsx(
                    "h-0.5 w-6 bg-white transition-all duration-200",
                    mobileMenuOpen && "translate-y-1.5 rotate-45",
                  )}
                />
                <div
                  className={clsx(
                    "h-0.5 w-6 bg-white transition-all duration-200",
                    mobileMenuOpen && "opacity-0",
                  )}
                />
                <div
                  className={clsx(
                    "h-0.5 w-6 bg-white transition-all duration-200",
                    mobileMenuOpen && "-translate-y-1.5 -rotate-45",
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={clsx(
            "overflow-hidden transition-all duration-300 ease-out md:hidden",
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="space-y-2 border-t border-white/10 py-4">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "block rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors duration-200 hover:bg-white/5 hover:text-white",
                  pathname === href && "bg-white/10 text-white",
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
