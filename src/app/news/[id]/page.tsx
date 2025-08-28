"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-64 animate-pulse rounded-lg bg-white/10"></div>
  ),
});

import "react-quill/dist/quill.snow.css";

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
    date: "August 28, 2025",
    title: "🎉 Welcome to Mind & Method!",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-white/90">
        We're excited to announce the launch of our psychology club! Join us for our first meeting this Monday in Room 143. 
        Come explore the fascinating world of psychology with us!
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

      </ul>
      
      <h2 class="mb-4 text-2xl font-bold text-cyan-300">First Meeting Details</h2>
      <p class="mb-6 text-lg leading-relaxed text-white/90">
        Join us for our first meeting on this Monday in Room 143 at 2:30 PM. 
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
  const [loggedInOfficer, setLoggedInOfficer] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState(article);
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedInOfficer(localStorage.getItem("loggedInOfficer"));
    }

    setTextareaValue(article?.content || "");

    const handleStorageChange = () => {
      setLoggedInOfficer(localStorage.getItem("loggedInOfficer"));
    };

    window.addEventListener("storage", handleStorageChange);

    const handleLoginChange = () => {
      setLoggedInOfficer(localStorage.getItem("loggedInOfficer"));
    };

    window.addEventListener("loginStateChanged", handleLoginChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginStateChanged", handleLoginChange);
    };
  }, [article]);

  const isBlogger = loggedInOfficer === "Blogger";

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
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      <div className="snow-bg fixed inset-0 -z-10"></div>

      <div className="min-h-screen px-6 py-16">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 flex items-center justify-between"
          >
            <Link
              href="/news"
              className="inline-flex items-center space-x-2 text-cyan-300 transition-colors hover:text-cyan-200"
            >
              <i className="fas fa-arrow-left"></i>
              <span>Back to News</span>
            </Link>

            {isBlogger && (
              <div className="flex items-center space-x-3">
                {isEditing ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const updatedArticle = {
                          ...editedArticle!,
                          content: textareaValue,
                        };

                        console.log("Saving changes:", updatedArticle);
                        setEditedArticle(updatedArticle);
                        setIsEditing(false);
                      }}
                      className="rounded-full bg-green-500/20 px-4 py-2 font-semibold text-green-300 transition-all hover:bg-green-500/30"
                    >
                      <i className="fas fa-save mr-2"></i>
                      Save Changes
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsEditing(false);
                        setEditedArticle(article);
                      }}
                      className="rounded-full bg-red-500/20 px-4 py-2 font-semibold text-red-300 transition-all hover:bg-red-500/30"
                    >
                      <i className="fas fa-times mr-2"></i>
                      Cancel
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="rounded-full bg-cyan-500/20 px-4 py-2 font-semibold text-cyan-300 transition-all hover:bg-cyan-500/30"
                  >
                    <i className="fas fa-edit mr-2"></i>
                    Edit Article
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>

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
              {isEditing ? (
                <input
                  type="text"
                  value={editedArticle?.title || ""}
                  onChange={(e) =>
                    setEditedArticle({
                      ...editedArticle!,
                      title: e.target.value,
                    })
                  }
                  className="mb-4 w-full border-none bg-transparent text-4xl font-black text-white drop-shadow-[0_4px_32px_rgba(64,224,208,0.7)] outline-none md:text-5xl"
                />
              ) : (
                <h1 className="mb-4 text-4xl font-black text-white drop-shadow-[0_4px_32px_rgba(64,224,208,0.7)] md:text-5xl">
                  {editedArticle?.title || article.title}
                </h1>
              )}
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
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Article Content
                    </label>

                    <ReactQuill
                      value={textareaValue}
                      onChange={(content) => {
                        setTextareaValue(content);
                        setEditedArticle({
                          ...editedArticle!,
                          content: content,
                        });
                      }}
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, false] }],
                          ["bold", "italic", "underline"],
                          [{ color: [] }, { background: [] }],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link", "image"],
                          ["clean"],
                        ],
                      }}
                      formats={[
                        "header",
                        "bold",
                        "italic",
                        "underline",
                        "color",
                        "background",
                        "list",
                        "bullet",
                        "link",
                        "image",
                      ]}
                      className="quill-editor"
                    />
                  </div>

                  <div className="rounded-lg border border-white/20 bg-white/5 p-4">
                    <h4 className="mb-2 text-sm font-medium text-white/70">
                      Preview:
                    </h4>
                    <div
                      className="text-sm text-white/90"
                      dangerouslySetInnerHTML={{
                        __html: textareaValue,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="text-white"
                  dangerouslySetInnerHTML={{
                    __html: editedArticle?.content || article.content,
                  }}
                />
              )}
            </motion.div>
          </motion.div>

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
