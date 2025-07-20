"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "/", icon: "fas fa-home" },
  { label: "Interest", href: "/interest", icon: "fas fa-heart" },
  { label: "Officers", href: "/officers", icon: "fas fa-users" },
  { label: "Media", href: "/media", icon: "fas fa-photo-video" },
  { label: "News", href: "/news", icon: "fas fa-newspaper" },
  { label: "Events", href: "/about", icon: "fas fa-calendar-alt" },
  { label: "Contact", href: "/contact-us", icon: "fas fa-envelope" },
];

export default function TopBar({ className = "" }: { className?: string }) {
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
    <>
      {/* Font Awesome CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

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
          <div className="flex h-16 items-center justify-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                  <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-black/90">
                    <i className="fas fa-brain text-lg text-white"></i>
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
            <nav className="ml-8 hidden items-center space-x-1 md:flex">
              {links.map(({ label, href, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "relative flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-white/5 hover:text-white",
                    pathname === href && "bg-white/10 text-white",
                  )}
                >
                  <i className={icon}></i>
                  <span>{label}</span>
                  {pathname === href && (
                    <div className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="absolute right-4 rounded-lg bg-white/5 p-2 transition-colors duration-200 hover:bg-white/10 md:hidden"
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

          {/* Mobile Menu */}
          <div
            className={clsx(
              "overflow-hidden transition-all duration-300 ease-out md:hidden",
              mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="space-y-2 border-t border-white/10 py-4">
              {links.map(({ label, href, icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    "flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors duration-200 hover:bg-white/5 hover:text-white",
                    pathname === href && "bg-white/10 text-white",
                  )}
                >
                  <i className={icon}></i>
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
