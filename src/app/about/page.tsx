"use client";
import { motion } from "framer-motion";
import Link from "next/link";

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
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.2,
    },
  },
};

export default function EventsPage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
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

      <div className="min-h-screen px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-16 text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="mb-6 text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_32px_rgba(64,224,208,0.7)] sm:text-[6rem]"
            >
              Upcoming Events <i className="fas fa-calendar-alt"></i>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-3xl text-2xl font-semibold text-white"
            >
              Stay updated with all our psychology club events, meetings, and
              activities!
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="mb-16"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-8 shadow-2xl backdrop-blur-xl"
            >
              <div className="rounded-xl border-2 border-cyan-400/30 bg-white/5 p-4">
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=dc4f966e363e9bc4a0128ecfb6c7df5876270d5c1a3611104b1f0dbd72bf1cb4%40group.calendar.google.com&ctz=America%2FNew_York"
                  style={{ border: 0, width: "100%", height: "600px" }}
                  frameBorder="0"
                  scrolling="no"
                  title="Mind & Method Club Calendar"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-3xl border-4 border-cyan-400/30 bg-gradient-to-br from-cyan-400/20 to-teal-500/20 p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/30"
            >
              <div className="mb-4 text-3xl">
                <i className="fas fa-users text-cyan-300"></i>
              </div>
              <h3 className="mb-4 text-xl font-bold text-white group-hover:text-cyan-300">
                Regular Meetings
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-white/90">
                Join us every alternate Monday at 3:30 PM in Room 143 for our
                weekly club meetings.
              </p>
              <div className="flex items-center text-cyan-300">
                <i className="fas fa-clock mr-2"></i>
                <span className="text-sm">Every alternate Monday, 3:30 PM</span>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-3xl border-4 border-yellow-400/30 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-yellow-400/50 hover:bg-white/30"
            >
              <div className="mb-4 text-3xl">
                <i className="fas fa-flask text-yellow-300"></i>
              </div>
              <h3 className="mb-4 text-xl font-bold text-white group-hover:text-yellow-300">
                Psychology Workshops
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-white/90">
                Hands-on psychology experiments and interactive learning
                sessions.
              </p>
              <div className="flex items-center text-yellow-300">
                <i className="fas fa-calendar-alt mr-2"></i>
                <span className="text-sm">Monthly Events</span>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-3xl border-4 border-green-400/30 bg-gradient-to-br from-green-400/20 to-emerald-500/20 p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-green-400/50 hover:bg-white/30"
            >
              <div className="mb-4 text-3xl">
                <i className="fas fa-graduation-cap text-green-300"></i>
              </div>
              <h3 className="mb-4 text-xl font-bold text-white group-hover:text-green-300">
                Study Sessions
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-white/90">
                Collaborative study sessions for psychology courses and exam
                preparation.
              </p>
              <div className="flex items-center text-green-300">
                <i className="fas fa-book mr-2"></i>
                <span className="text-sm">Weekly Sessions</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="mt-20"
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
                <h2 className="mb-4 text-3xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,224,208,0.5)]">
                  <i className="fas fa-envelope mr-3"></i>
                  Questions About Events?
                </h2>
                <p className="mb-6 text-white/90">
                  Have questions about upcoming events or want to suggest new
                  activities?
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact-us">
                    <button className="cursor-pointer rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:from-cyan-400 hover:to-teal-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none">
                      Contact Us <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
