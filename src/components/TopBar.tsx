"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const links = [
  { label: "Home", href: "/", icon: "fas fa-home" },
  { label: "Interest", href: "/interest", icon: "fas fa-heart" },
  { label: "Officers", href: "/officers", icon: "fas fa-users" },
  //{ label: "Media", href: "/media", icon: "fas fa-photo-video" },
  { label: "News", href: "/news", icon: "fas fa-newspaper" },
  { label: "Events", href: "/upcoming-events", icon: "fas fa-calendar-alt" },
  { label: "Contact", href: "/contact-us", icon: "fas fa-envelope" },
];

export default function TopBar({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOfficerModal, setShowOfficerModal] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggedInOfficer, setLoggedInOfficer] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("loggedInOfficer");
    }
    return null;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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
            <div className="-ml-4 flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                  <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-black/90">
                    <Image
                      src="/new.png"
                      alt="Mind & Method Logo"
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
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

            <div className="ml-8 hidden md:block">
              {loggedInOfficer ? (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  className="flex items-center space-x-3"
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`bg-gradient-to-r ${
                      loggedInOfficer === "Ava"
                        ? "from-[#B8F5E8] to-[#02CFA5]"
                        : loggedInOfficer === "Blogger"
                          ? "from-[#B8F5F5] to-[#02CACF]"
                          : loggedInOfficer === "Media"
                            ? "from-[#B8F5FF] to-[#00B1F7]"
                            : "from-[#CCE0FF] to-[#2577FF]"
                    } bg-[length:200%_200%] bg-clip-text text-lg font-bold text-transparent`}
                  >
                    Welcome Back, {loggedInOfficer}
                  </motion.span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setLoggedInOfficer(null);
                      localStorage.removeItem("loggedInOfficer");
                      window.dispatchEvent(new Event("loginStateChanged"));
                    }}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                  >
                    <i className="fas fa-sign-out-alt mr-1"></i>
                    Sign Out
                  </motion.button>
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </button>
              )}
            </div>

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

      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border-6 border-purple-800/70 bg-gradient-to-br from-white/40 to-white/20 p-8 shadow-2xl backdrop-blur-xl"
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-white/70 transition-colors hover:text-white"
              >
                <i className="fas fa-times text-xl"></i>
              </button>

              <div className="text-center">
                <div className="mb-6">
                  <i className="fas fa-user-shield mb-4 text-4xl text-purple-300"></i>
                  <h2 className="mb-2 text-2xl font-bold text-white">
                    Officer Login
                  </h2>
                  <p className="text-white/70">
                    Enter your password to access officer features
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoginError("");

                    if (password === "mindnmethod2025!") {
                      console.log("Login successful!");
                      setShowLoginModal(false);
                      setShowOfficerModal(true);
                      setPassword("");
                      setLoginError("");
                    } else {
                      setLoginError("Incorrect password. Please try again.");
                    }
                  }}
                >
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-left text-sm font-medium text-white/90"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border-2 border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-all focus:border-purple-400 focus:outline-none"
                      placeholder="Enter password"
                      required
                    />
                    {loginError && (
                      <p className="mt-2 text-left text-sm text-red-400">
                        <i className="fas fa-exclamation-triangle mr-1"></i>
                        {loginError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-purple-600 px-6 py-3 text-lg font-bold text-white shadow-xl transition-all hover:bg-purple-500 hover:shadow-purple-500/25 focus:ring-2 focus:ring-purple-300 focus:outline-none"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Login
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOfficerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowOfficerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border-6 border-purple-800/70 bg-gradient-to-br from-white/40 to-white/20 p-8 shadow-2xl backdrop-blur-xl"
            >
              <button
                onClick={() => setShowOfficerModal(false)}
                className="absolute top-4 right-4 text-white/70 transition-colors hover:text-white"
              >
                <i className="fas fa-times text-xl"></i>
              </button>

              <div className="text-center">
                <div className="mb-6">
                  <i className="fas fa-users mb-4 text-4xl text-purple-300"></i>
                  <h2 className="mb-2 text-2xl font-bold text-white">
                    Select Officer
                  </h2>
                  <p className="text-white/70">
                    Choose which officer is signing in
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Ava",
                      icon: "fas fa-crown",
                      color: "from-[#02CFA5] to-[#02CFA5]",
                    },
                    {
                      name: "Blogger",
                      icon: "fas fa-pen-fancy",
                      color: "from-[#02CACF] to-[#02CACF]",
                    },
                    {
                      name: "Media",
                      icon: "fas fa-camera",
                      color: "from-[#00B1F7] to-[#00B1F7]",
                    },
                    {
                      name: "Anika",
                      icon: "fas fa-star",
                      color: "from-[#2577FF] to-[#2577FF]",
                    },
                  ].map((officer) => (
                    <motion.button
                      key={officer.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        console.log(`${officer.name} signed in successfully!`);
                        setLoggedInOfficer(officer.name);
                        localStorage.setItem("loggedInOfficer", officer.name);
                        window.dispatchEvent(new Event("loginStateChanged"));
                        setShowOfficerModal(false);
                      }}
                      className={`group relative w-full overflow-hidden rounded-xl border-2 border-white/30 bg-gradient-to-r ${officer.color} p-4 text-lg font-bold text-white shadow-lg transition-all hover:border-white/50 hover:shadow-xl focus:outline-none`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                            <i
                              className={`${officer.icon} text-xl text-white`}
                            ></i>
                          </div>
                          <span className="text-lg font-semibold">
                            {officer.name}
                          </span>
                        </div>
                        <div className="opacity-0 transition-opacity group-hover:opacity-100">
                          <i className="fas fa-arrow-right text-white/80"></i>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
