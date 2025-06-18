"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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

  return (
    <header
      className={clsx(
        "mt-0 flex w-full items-center justify-between rounded-full bg-blue-950/80 px-8 py-1 shadow-md backdrop-blur-md",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/.png"
          alt="Club Logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <span className="text-xl font-bold text-white select-none">Mind &</span>
      </div>
      <nav className="flex items-center gap-8">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "text-lg font-medium text-gray-100 transition-colors duration-150 hover:text-white",
              pathname === href && "text-white underline underline-offset-4",
            )}
          >
            {label}
          </Link>
        ))}
        {session.status === "loading" ? (
          <span className="ml-4 text-gray-400">Loading...</span>
        ) : session.status === "authenticated" ? (
          <button
            onClick={() => signOut()}
            className="ml-4 text-lg font-medium text-blue-400 transition-colors duration-150 hover:text-white"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="ml-4 text-lg font-medium text-blue-400 transition-colors duration-150 hover:text-white"
          >
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
}
