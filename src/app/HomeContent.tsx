"use client";
import Link from "next/link";
import { motion } from "framer-motion";

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

const confettiVariants = {
  fall: {
    y: [-100, 1000],
    rotate: [0, 360],
    transition: {
      duration: 3,
      repeat: Infinity,
    },
  },
};

export default function HomeContent() {
  return (
    <>
      {/* Font Awesome CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      {/* Animated background with confetti and sparkles */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient background */}
        <div className="to-turquoise-500 absolute inset-0 bg-gradient-to-br from-teal-400 via-cyan-500" />

        {/* Confetti */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            variants={confettiVariants}
            animate="fall"
            className="absolute h-2 w-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: [
                "#40e0d0",
                "#48d1cc",
                "#20b2aa",
                "#00ced1",
                "#7fffd4",
                "#40e0d0",
                "#00bfff",
              ][Math.floor(Math.random() * 7)],
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Sparkles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute h-1 w-1 rounded-full bg-cyan-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <main className="flex min-h-screen flex-col items-center justify-start px-6 text-white">
        <div className="container mt-6 flex flex-col items-center gap-16 px-4 py-16">
          {/* Hero Section */}
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
                    <span className="text-6xl">🧠</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_32px_rgba(64,224,208,0.7)] sm:text-[6rem]"
            >
              Welcome to Mind & Method! 🎉
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

          {/* What Makes Us Special */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="w-full max-w-6xl"
          >
            <motion.h2
              variants={itemVariants}
              className="mb-12 text-center text-5xl font-bold text-white"
            >
              Why You'll <span className="text-cyan-300">LOVE</span> Mind &
              Method! 💖
            </motion.h2>

            <motion.div
              variants={containerVariants}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  icon: "🎭",
                  title: "Mystery Adventures!",
                  description:
                    "Become a detective! Solve real psychological mysteries and use your brain like never before!",
                  gradient: "from-teal-500 to-cyan-600",
                },
                {
                  icon: "🎪",
                  title: "Super Fun Activities!",
                  description:
                    "No boring stuff here! Every session is packed with games, experiments, and mind-blowing discoveries!",
                  gradient: "from-cyan-500 to-turquoise-600",
                },
                {
                  icon: "🌟",
                  title: "Make Amazing Friends!",
                  description:
                    "Join a community of curious minds who love psychology just like you!",
                  gradient: "from-turquoise-500 to-teal-600",
                },
                {
                  icon: "🎯",
                  title: "Learn Real Skills!",
                  description:
                    "Develop superpowers like reading people's minds (well, almost!) and understanding human behavior!",
                  gradient: "from-cyan-400 to-teal-500",
                },
                {
                  icon: "🎨",
                  title: "Be Creative!",
                  description:
                    "Express yourself through psychology! Create experiments, design challenges, and think outside the box!",
                  gradient: "from-teal-400 to-cyan-500",
                },
                {
                  icon: "🏆",
                  title: "Build Your Future!",
                  description:
                    "Gain skills that colleges and jobs love! Psychology knowledge is like a superpower in any career!",
                  gradient: "from-turquoise-400 to-teal-500",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative overflow-hidden rounded-3xl border-4 border-white/30 bg-white/20 p-8 shadow-2xl backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/30"
                >
                  <div
                    className={`mb-6 inline-block rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 text-4xl shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-cyan-300">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-white/90">{feature.description}</p>
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 to-teal-500/20 opacity-0 transition-opacity group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="w-full max-w-4xl text-center"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-12 shadow-2xl backdrop-blur-xl"
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

              <div className="relative z-10">
                <h2 className="mb-6 text-5xl font-bold text-white">
                  Ready to Have the{" "}
                  <span className="text-cyan-300">BEST TIME EVER</span>? 🎉
                </h2>
                <p className="mb-8 text-2xl text-white/90">
                  Don't miss out on the most exciting psychology club in school!
                  <br />
                  <span className="font-bold text-cyan-300">
                    No experience needed—just bring your awesome self! 🌟
                  </span>
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 p-1 shadow-2xl"
                  >
                    <Link
                      href="/interest"
                      className="block rounded-full bg-white px-10 py-5 text-xl font-bold text-teal-600 transition-colors hover:bg-teal-50"
                    >
                      🚀 START YOUR ADVENTURE!
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full border-4 border-white/80 p-1 shadow-2xl"
                  >
                    <Link
                      href="/officers"
                      className="block rounded-full bg-white/20 px-10 py-5 text-xl font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                    >
                      <i className="fas fa-users mr-2"></i>
                      Meet Our Amazing Team!
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </main>
    </>
  );
}
