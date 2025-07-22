"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const TypewriterText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsTypingComplete(true);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [currentIndex, text]);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setCurrentIndex(0);
      setIsTypingComplete(false);
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [delay]);

  return (
    <span className="inline-block">
      <span className="animate-pulse bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
        {displayText}
      </span>
      {!isTypingComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const delayedContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.8,
    },
  },
};

const meetingContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.2,
    },
  },
};

export default function HomeContent() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      <div className="snow-bg fixed inset-0 -z-10"></div>

      <main className="flex min-h-screen flex-col items-center justify-start px-6 text-white">
        <div className="container mt-6 flex flex-col items-center gap-16 px-4 py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="to-turquoise-500 absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-teal-500 opacity-70 blur-xl"
                />
                <div className="to-turquoise-500 relative rounded-full bg-gradient-to-r from-cyan-400 via-teal-500 p-2">
                  <div className="rounded-full bg-white p-8">
                    <Image
                      src="/trans.png"
                      alt="Mind & Method Logo"
                      width={96}
                      height={96}
                      className="h-24 w-24 object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_32px_rgba(64,224,208,0.7)] sm:text-[6rem]"
            >
              Welcome to <TypewriterText text="Mind & Method" delay={0.5} />! 🎉
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-3xl text-2xl font-semibold text-white"
            >
              <span className="text-cyan-300">
                🎈 The COOLEST Psychology Club Ever! 🎈
              </span>
              <br />
              <span className="mt-2 block text-lg text-white/90">
                Join us for mind-blowing adventures, mystery solving, and the
                most fun you'll ever have learning about psychology!
              </span>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap justify-center gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 p-1 shadow-2xl"
              >
                <Link
                  href="/interest"
                  className="block rounded-full bg-white px-8 py-4 font-bold text-teal-600 transition-colors hover:bg-teal-50"
                >
                  🚀 JOIN THE FUN!
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border-4 border-white/80 p-1 shadow-2xl"
              >
                <Link
                  href="/officers"
                  className="block rounded-full bg-white/20 px-8 py-4 font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  <i className="fas fa-users mr-2"></i>
                  Meet Our Awesome Team!
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.section
            initial="hidden"
            animate="visible"
            variants={meetingContainerVariants}
            className="mb-16"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-8 shadow-2xl backdrop-blur-xl"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-teal-500/30"
              />
              <div className="relative z-10 text-center">
                <h2 className="mb-6 text-4xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,224,208,0.5)]">
                  📅 Meeting Information
                </h2>
                <div className="mb-8 grid gap-6 md:grid-cols-2">
                  <div className="text-center">
                    <h3 className="mb-2 text-2xl font-bold text-white">
                      📍 Room 171
                    </h3>
                    <p className="text-white/90">
                      Join us in Room 171 for all our exciting psychology
                      activities!
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="mb-2 text-2xl font-bold text-white">
                      ⏰ Every Alternate Monday
                    </h3>
                    <p className="text-white/90">
                      Meetings held every alternate Monday after school
                    </p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    href="/interest"
                    className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:from-cyan-400 hover:to-teal-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                  >
                    Learn More About Our Club 🚀
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.section>

          <motion.section
            initial="hidden"
            animate="visible"
            variants={delayedContainerVariants}
            className="w-full max-w-4xl"
          >
            <motion.h2
              variants={itemVariants}
              className="mb-8 text-center text-4xl font-bold text-white"
            >
              What We Do 🧠
            </motion.h2>

            <motion.div
              variants={containerVariants}
              className="grid gap-6 md:grid-cols-3"
            >
              {[
                {
                  icon: "🎭",
                  title: "Mystery Adventures",
                  description: "Solve psychological mysteries and case studies",
                },
                {
                  icon: "🎪",
                  title: "Fun Activities",
                  description:
                    "Games, experiments, and mind-blowing discoveries",
                },
                {
                  icon: "🌟",
                  title: "Make Friends",
                  description: "Join a community of curious minds",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative overflow-hidden rounded-2xl border-2 border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/30"
                >
                  <div className="mb-4 inline-block rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 p-3 text-3xl shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white group-hover:text-cyan-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/90">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={delayedContainerVariants}
          className="mt-20 mb-10 w-full max-w-4xl"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-8 text-center text-4xl font-extrabold text-cyan-300 drop-shadow"
          >
            Cool Psychology Facts 🤩
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="relative mx-auto flex max-w-2xl flex-col items-center gap-8"
          >
            <AnimatedFactCarousel />
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              <span className="text-3xl">🧠</span>
              <span className="text-3xl">🎉</span>
              <span className="text-3xl">💡</span>
              <span className="text-3xl">🤔</span>
              <span className="text-3xl">🌈</span>
            </div>
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8"
            >
              <Link
                href="/news"
                className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:from-pink-400 hover:to-purple-500 focus:ring-2 focus:ring-pink-300 focus:outline-none"
              >
                See the Latest Mind & Method News!
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}

const funFacts = [
  "Your brain is sometimes more active when you're asleep than when you're awake!",
  "The human brain has about 86 billion neurons.",
  "Smiling can trick your brain into feeling happier.",
  "You can't actually multitask—your brain just switches quickly between tasks.",
  "Memories are reconstructed, not replayed, every time you remember them.",
  "Yawning is contagious—even thinking about yawning can make you yawn!",
  "Color can affect your mood and behavior.",
  "Music can boost memory and learning.",
];

function AnimatedFactCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % funFacts.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [index]);
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="min-h-[80px] rounded-2xl border-2 border-cyan-300/30 bg-white/20 px-8 py-6 text-center text-xl font-semibold text-white shadow-lg backdrop-blur-md"
    >
      <span className="text-cyan-200">Did you know?</span>
      <br />
      <span className="text-white">{funFacts[index]}</span>
    </motion.div>
  );
}
