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
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.2,
    },
  },
};

const announcements = [
  {
    id: 1,
    date: "December 15, 2024",
    title: "🎉 Welcome to Mind & Method!",
    content:
      "We're excited to announce the launch of our psychology club! Join us for our first meeting this Monday in Room 171. Come explore the fascinating world of psychology with us!",
    category: "Announcement",
    priority: "high",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "border-red-400 bg-red-400/20";
    case "medium":
      return "border-yellow-400 bg-yellow-400/20";
    case "low":
      return "border-green-400 bg-green-400/20";
    default:
      return "border-cyan-400 bg-cyan-400/20";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Announcement":
      return "📢";
    case "Event":
      return "🎪";
    case "Meeting":
      return "👥";
    case "Opportunity":
      return "🌟";
    case "Recap":
      return "📝";
    default:
      return "📰";
  }
};

export default function NewsPage() {
  return (
    <>
      {/* Font Awesome CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      {/* Animated background with confetti and sparkles */}
      <div className="snow-bg fixed inset-0 -z-10"></div>

      <div className="min-h-screen px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
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
              Latest News <i className="fas fa-newspaper"></i>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-3xl text-2xl font-semibold text-white"
            >
              Stay updated with the latest announcements, events, and happenings
              in the Mind & Method psychology club!
            </motion.p>
          </motion.div>

          {/* News Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="flex justify-center"
          >
            <div className="grid max-w-2xl gap-8 md:grid-cols-1 lg:grid-cols-1">
              {announcements.map((announcement, index) => (
                <Link href={`/news/${announcement.id}`} key={announcement.id}>
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className={`group relative overflow-hidden rounded-3xl border-4 ${getPriorityColor(announcement.priority)} cursor-pointer p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/30`}
                  >
                    {/* Priority indicator */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          announcement.priority === "high"
                            ? "bg-red-500 text-white"
                            : announcement.priority === "medium"
                              ? "bg-yellow-500 text-white"
                              : "bg-green-500 text-white"
                        }`}
                      >
                        {announcement.priority.toUpperCase()}
                      </span>
                    </div>

                    {/* Category icon */}
                    <div className="mb-4 text-3xl">
                      {getCategoryIcon(announcement.category)}
                    </div>

                    {/* Date */}
                    <p className="mb-3 text-sm text-white/70">
                      {announcement.date}
                    </p>

                    {/* Title */}
                    <h3 className="mb-4 text-xl font-bold text-white group-hover:text-cyan-300">
                      {announcement.title}
                    </h3>

                    {/* Content */}
                    <p className="mb-4 text-sm leading-relaxed text-white/90">
                      {announcement.content}
                    </p>

                    {/* Category */}
                    <div className="flex items-center justify-between">
                      <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                        {announcement.category}
                      </span>
                      <div className="text-cyan-300">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>

                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 to-teal-500/20 opacity-0 transition-opacity group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Signup */}
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
                  📧 Stay Updated!
                </h2>
                <p className="mb-6 text-white/90">
                  Get notified about new announcements, events, and club
                  activities.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:from-cyan-400 hover:to-teal-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                >
                  Subscribe to Updates 🚀
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
