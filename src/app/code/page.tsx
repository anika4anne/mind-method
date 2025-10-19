"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CodePage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 6);
    setCode(value);
    setMessage("");
  };

  const handleSubmit = () => {
    if (code.length === 6) {
      if (code === "M8MD13") {
        setMessage("🎉 Congratulations! You got it!");
        setIsCorrect(true);
      } else {
        setMessage("❌ Incorrect answer, try again!");
        setIsCorrect(false);
      }
    } else {
      setMessage("Please enter a 6-character code");
      setIsCorrect(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url(/2.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="container mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/20 to-white/10 p-12 shadow-2xl backdrop-blur-xl"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-teal-500/30"
              />

              <div className="relative z-10">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mb-8 text-4xl font-black text-white drop-shadow-[0_4px_32px_rgba(64,224,208,0.7)]"
                >
                  🔐 Secret Code
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="mb-8 text-lg text-white/90"
                >
                  Enter the 6-character code to unlock the secret
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="mb-6"
                >
                  <input
                    type="text"
                    value={code}
                    onChange={handleCodeChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter code"
                    maxLength={6}
                    className="w-full rounded-2xl border-4 border-white/30 bg-white/20 px-6 py-4 text-center font-mono text-3xl font-bold text-white placeholder-white/50 backdrop-blur-sm focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 focus:outline-none"
                  />
                </motion.div>

                {!isCorrect && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    disabled={code.length !== 6}
                    className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-4 text-xl font-bold text-white shadow-xl transition hover:from-cyan-400 hover:to-teal-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    Submit Code
                  </motion.button>
                )}

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`mt-6 rounded-2xl p-4 text-lg font-semibold ${
                      isCorrect
                        ? "border border-green-400/30 bg-green-500/20 text-green-300"
                        : "border border-red-400/30 bg-red-500/20 text-red-300"
                    }`}
                  >
                    {message}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
