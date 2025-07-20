"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

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

const articles = [
  {
    id: "1",
    date: "December 15, 2024",
    title: "🎉 Welcome to Mind & Method!",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-white/90">
        We're thrilled to announce the official launch of Mind & Method, JJHS psychology club! 
        After months of planning and preparation, we're finally ready to explore the fascinating world of psychology together.
      </p>
      
      <h2 class="mb-4 text-2xl font-bold text-cyan-300">What We'll Be Doing</h2>
      <p class="mb-6 text-lg leading-relaxed text-white/90">
        Our club will focus on hands-on learning experiences, including:
      </p>
      <ul class="mb-6 list-disc list-inside space-y-2 text-white/90">
        <li>Interactive psychology experiments and demonstrations</li>
        <li>Guest speakers from the psychology field</li>
        <li>Movie nights for club bonding</li>
        <li>Study sessions for psychology courses</li>
        <li>Field trips including an Escape Room</li>
      </ul>
      
      <h2 class="mb-4 text-2xl font-bold text-cyan-300">First Meeting Details</h2>
      <p class="mb-6 text-lg leading-relaxed text-white/90">
        Join us for our first meeting on this Thursday in Room 171 at 3:30 PM. 
        We'll be introducing our officers, discussing upcoming events, and getting to know each other.
      </p>
      
      <div class="mb-6 p-4 bg-white/10 rounded-xl border border-cyan-400/30">
        <h3 class="mb-2 text-lg font-semibold text-cyan-300">Meeting Highlights:</h3>
        <ul class="space-y-1 text-white/90">
          <li>• Club introduction and goals</li>
          <li>• Leadership team presentations</li>
          <li>• Upcoming events calendar</li>
          <li>• Q&A session</li>
        </ul>
      </div>
      
      <p class="text-lg leading-relaxed text-white/90">
        Come explore the fascinating world of psychology with us! Whether you're a psychology major, 
        just curious about the human mind, or looking for a supportive community, everyone is welcome.
      </p>
    `,
    category: "Announcement",
    priority: "high",
    author: "Mind & Method Leadership Team",
    readTime: "5 min read",
  },
];

export default function ArticlePage() {
  const params = useParams();
  const articleId = params.id as string;
  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            Article Not Found
          </h1>
          <Link href="/news" className="text-cyan-300 hover:text-cyan-200">
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Font Awesome CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      {/* Animated background */}
      <div className="snow-bg fixed inset-0 -z-10"></div>

      <div className="min-h-screen px-6 py-16">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/news"
              className="inline-flex items-center space-x-2 text-cyan-300 transition-colors hover:text-cyan-200"
            >
              <i className="fas fa-arrow-left"></i>
              <span>Back to News</span>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-12"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="mb-4 flex items-center space-x-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    article.priority === "high"
                      ? "bg-red-500 text-white"
                      : article.priority === "medium"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-500 text-white"
                  }`}
                >
                  {article.priority.toUpperCase()}
                </span>
                <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  {article.category}
                </span>
                <span className="text-sm text-white/70">
                  <i className="fas fa-clock mr-1"></i>
                  {article.readTime}
                </span>
              </div>
              <h1 className="mb-4 text-4xl font-black text-white drop-shadow-[0_4px_32px_rgba(64,224,208,0.7)] md:text-5xl">
                {article.title}
              </h1>
              <div className="flex items-center space-x-4 text-white/70">
                <span className="flex items-center space-x-2">
                  <i className="fas fa-calendar"></i>
                  <span>{article.date}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <i className="fas fa-user"></i>
                  <span>{article.author}</span>
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="prose prose-lg max-w-none"
          >
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/20 to-white/10 p-8 shadow-2xl backdrop-blur-xl"
            >
              <div
                className="text-white"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </motion.div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <h3 className="mb-4 text-xl font-semibold text-white">
              Share this article
            </h3>
            <div className="flex justify-center space-x-4">
              <button className="rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20">
                <i className="fab fa-twitter text-cyan-300"></i>
              </button>
              <button className="rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20">
                <i className="fab fa-facebook text-cyan-300"></i>
              </button>
              <button className="rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20">
                <i className="fas fa-envelope text-cyan-300"></i>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
