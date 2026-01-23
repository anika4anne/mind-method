"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

export default function MediaPage() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url(/bg/3.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="min-h-screen px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="mb-4 text-6xl font-black text-white drop-shadow-[0_4px_32px_rgba(64,224,208,0.7)]"
            >
              📱 Social Media
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mb-12 text-xl text-white/90"
            >
              Connect with us on social media and stay updated with all our
              latest news and events!
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="group relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-cyan-400/50 hover:bg-white/30"
              >
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-4xl">
                    <i className="fab fa-instagram text-white"></i>
                  </div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Instagram
                </h3>
                <p className="mb-6 text-white/80">
                  Follow us for daily updates, behind-the-scenes content, and
                  psychology insights!
                </p>
                <motion.a
                  href="https://www.instagram.com/mindmethodjjhs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                >
                  Follow Us
                  <i className="fas fa-arrow-right ml-2"></i>
                </motion.a>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="group relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-cyan-400/50 hover:bg-white/30"
              >
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-4xl">
                    <i className="fas fa-envelope text-white"></i>
                  </div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">Email</h3>
                <p className="mb-6 text-white/80">
                  Reach out to us directly via email for questions, suggestions,
                  or collaborations!
                </p>
                <motion.a
                  href="mailto:mindmethodjjhs@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                >
                  Send Email
                  <i className="fas fa-arrow-right ml-2"></i>
                </motion.a>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="group relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-cyan-400/50 hover:bg-white/30 md:col-span-2 lg:col-span-1"
              >
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-4xl">
                    <i className="fas fa-newspaper text-white"></i>
                  </div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">News</h3>
                <p className="mb-6 text-white/80">
                  Check out our latest news articles and club announcements!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/news"
                    className="inline-block rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                  >
                    Read News
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
              className="mt-20"
            >
              <motion.h2
                variants={itemVariants}
                className="mb-8 text-center text-4xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,224,208,0.5)]"
              >
                Stay Connected 🌟
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="mx-auto max-w-3xl text-lg text-white/80"
              >
                Join our community and be part of the Mind & Method family!
                Follow us on Instagram for daily updates, subscribe to our
                newsletter for exclusive content, and don't forget to check out
                our latest news and events.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}



