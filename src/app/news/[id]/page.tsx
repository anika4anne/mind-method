"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

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
        Join us for our first meeting on this Monday in Room 171 at 3:30 PM. 
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

    // Set initial textarea value
    setTextareaValue(getPlainText(article?.content || ""));

    // Listen for changes to localStorage
    const handleStorageChange = () => {
      setLoggedInOfficer(localStorage.getItem("loggedInOfficer"));
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events (for same-tab updates)
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

  // Function to strip HTML tags and get plain text
  const getPlainText = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  // Function to convert plain text to HTML with proper formatting
  const convertToHtml = (plainText: string) => {
    if (!plainText) return "";

    // Split by lines and process each line
    const lines = plainText.split("\n");
    const processedLines = lines.map((line: string) => {
      let processedLine = line.trim();

      // Handle headers
      if (processedLine.startsWith("# ")) {
        return `<h1 class="mb-4 text-2xl font-bold text-cyan-300">${processedLine.substring(2)}</h1>`;
      }
      if (processedLine.startsWith("## ")) {
        return `<h2 class="mb-4 text-xl font-bold text-cyan-300">${processedLine.substring(3)}</h2>`;
      }
      if (processedLine.startsWith("### ")) {
        return `<h3 class="mb-3 text-lg font-semibold text-cyan-300">${processedLine.substring(4)}</h3>`;
      }

      // Handle bullet points
      if (processedLine.startsWith("• ")) {
        return `<li class="mb-2 text-white/90">${processedLine.substring(2)}</li>`;
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(processedLine)) {
        return `<li class="mb-2 text-white/90">${processedLine.replace(/^\d+\.\s/, "")}</li>`;
      }

      // Handle color tags
      processedLine = processedLine.replace(
        /\[cyan\](.*?)\[\/color\]/g,
        '<span class="text-cyan-300">$1</span>',
      );
      processedLine = processedLine.replace(
        /\[yellow\](.*?)\[\/color\]/g,
        '<span class="text-yellow-300">$1</span>',
      );
      processedLine = processedLine.replace(
        /\[red\](.*?)\[\/color\]/g,
        '<span class="text-red-300">$1</span>',
      );
      processedLine = processedLine.replace(
        /\[green\](.*?)\[\/color\]/g,
        '<span class="text-green-300">$1</span>',
      );

      // Handle bold, italic, and underline
      processedLine = processedLine.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-bold">$1</strong>',
      );
      processedLine = processedLine.replace(
        /\*(.*?)\*/g,
        '<em class="italic">$1</em>',
      );
      processedLine = processedLine.replace(
        /__(.*?)__/g,
        '<u class="underline">$1</u>',
      );

      // Handle alignment
      processedLine = processedLine.replace(
        /\[align=center\](.*?)\[\/align\]/g,
        '<div class="text-center">$1</div>',
      );
      processedLine = processedLine.replace(
        /\[align=right\](.*?)\[\/align\]/g,
        '<div class="text-right">$1</div>',
      );
      processedLine = processedLine.replace(
        /\[align=left\](.*?)\[\/align\]/g,
        '<div class="text-left">$1</div>',
      );

      // If line is empty, return a line break
      if (processedLine === "") {
        return "<br>";
      }

      // Regular paragraph
      return `<p class="mb-4 text-lg leading-relaxed text-white/90">${processedLine}</p>`;
    });

    // Group consecutive list items
    let result = "";
    let inList = false;
    let listType = "";

    for (let i = 0; i < processedLines.length; i++) {
      const line = processedLines[i]!;

      if (line.includes("<li>")) {
        if (!inList) {
          listType = line.includes("•") ? "ul" : "ol";
          result += `<${listType} class="mb-4 list-disc list-inside space-y-2 text-white/90">`;
          inList = true;
        }
        result += line;
      } else {
        if (inList) {
          result += `</${listType}>`;
          inList = false;
        }
        result += line;
      }
    }

    if (inList) {
      result += `</${listType}>`;
    }

    return result;
  };

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
          {/* Back Button and Edit Button */}
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
                        // Convert plain text back to HTML format
                        const plainText = editedArticle?.content || "";
                        const htmlContent = convertToHtml(plainText);

                        const updatedArticle = {
                          ...editedArticle!,
                          content: htmlContent,
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
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Article Content
                    </label>

                    {/* Rich Text Toolbar */}
                    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 p-3">
                      {/* Text Style Buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              const formattedText = `**${selected}**`;
                              const newValue = before + formattedText + after;
                              textarea.value = newValue;
                              setTextareaValue(newValue);
                              textarea.setSelectionRange(
                                start,
                                start + formattedText.length,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-bold"></i>
                        </button>
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              const formattedText = `*${selected}*`;
                              const newValue = before + formattedText + after;
                              textarea.value = newValue;
                              setTextareaValue(newValue);
                              textarea.setSelectionRange(
                                start,
                                start + formattedText.length,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-italic"></i>
                        </button>
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              const formattedText = `__${selected}__`;
                              const newValue = before + formattedText + after;
                              textarea.value = newValue;
                              setTextareaValue(newValue);
                              textarea.setSelectionRange(
                                start,
                                start + formattedText.length,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-underline"></i>
                        </button>
                      </div>

                      {/* Text Color */}
                      <select
                        className="rounded border-none bg-white/20 px-3 py-1 text-sm text-white outline-none"
                        onChange={(e) => {
                          const textarea = document.querySelector("textarea");
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const text = textarea.value;
                            const before = text.substring(0, start);
                            const selected = text.substring(start, end);
                            const after = text.substring(end);

                            let colorTag = "";
                            switch (e.target.value) {
                              case "cyan":
                                colorTag = "[cyan]";
                                break;
                              case "yellow":
                                colorTag = "[yellow]";
                                break;
                              case "red":
                                colorTag = "[red]";
                                break;
                              case "green":
                                colorTag = "[green]";
                                break;
                              default:
                                colorTag = "";
                            }

                            const formattedText =
                              colorTag +
                              selected +
                              (colorTag ? "[/color]" : "");
                            textarea.value = before + formattedText + after;
                            textarea.setSelectionRange(
                              start,
                              start + formattedText.length,
                            );
                            textarea.focus();
                          }
                        }}
                      >
                        <option value="white">White</option>
                        <option value="cyan">Cyan</option>
                        <option value="yellow">Yellow</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                      </select>

                      {/* Alignment */}
                      <div className="flex items-center gap-1">
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              textarea.value =
                                before +
                                `[align=left]${selected}[/align]` +
                                after;
                              textarea.setSelectionRange(
                                start,
                                start + selected.length + 16,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-align-left"></i>
                        </button>
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              textarea.value =
                                before +
                                `[align=center]${selected}[/align]` +
                                after;
                              textarea.setSelectionRange(
                                start,
                                start + selected.length + 18,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-align-center"></i>
                        </button>
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              textarea.value =
                                before +
                                `[align=right]${selected}[/align]` +
                                after;
                              textarea.setSelectionRange(
                                start,
                                start + selected.length + 17,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-align-right"></i>
                        </button>
                      </div>

                      {/* Lists */}
                      <div className="flex items-center gap-1">
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              const lines = selected.split("\n");
                              const bulletedLines = lines
                                .map((line) => `• ${line}`)
                                .join("\n");

                              textarea.value = before + bulletedLines + after;
                              textarea.setSelectionRange(
                                start,
                                start + bulletedLines.length,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-list-ul"></i>
                        </button>
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              const lines = selected.split("\n");
                              const numberedLines = lines
                                .map((line, index) => `${index + 1}. ${line}`)
                                .join("\n");

                              textarea.value = before + numberedLines + after;
                              textarea.setSelectionRange(
                                start,
                                start + numberedLines.length,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-list-ol"></i>
                        </button>
                      </div>
                      <select
                        className="rounded border-none bg-white/20 px-3 py-1 text-sm text-white outline-none"
                        onChange={(e) => {
                          const textarea = document.querySelector("textarea");
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const text = textarea.value;
                            const before = text.substring(0, start);
                            const selected = text.substring(start, end);
                            const after = text.substring(end);

                            let colorTag = "";
                            switch (e.target.value) {
                              case "cyan":
                                colorTag = "[cyan]";
                                break;
                              case "yellow":
                                colorTag = "[yellow]";
                                break;
                              case "red":
                                colorTag = "[red]";
                                break;
                              case "green":
                                colorTag = "[green]";
                                break;
                              default:
                                colorTag = "";
                            }

                            const formattedText =
                              colorTag +
                              selected +
                              (colorTag ? "[/color]" : "");
                            textarea.value = before + formattedText + after;
                            textarea.setSelectionRange(
                              start,
                              start + formattedText.length,
                            );
                            textarea.focus();
                          }
                        }}
                      >
                        <option value="white">White</option>
                        <option value="cyan">Cyan</option>
                        <option value="yellow">Yellow</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                      </select>

                      {/* Alignment */}
                      <div className="flex items-center gap-1">
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              textarea.value =
                                before +
                                `[align=left]${selected}[/align]` +
                                after;
                              textarea.setSelectionRange(
                                start,
                                start + selected.length + 16,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-align-left"></i>
                        </button>
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              textarea.value =
                                before +
                                `[align=center]${selected}[/align]` +
                                after;
                              textarea.setSelectionRange(
                                start,
                                start + selected.length + 18,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-align-center"></i>
                        </button>
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              textarea.value =
                                before +
                                `[align=right]${selected}[/align]` +
                                after;
                              textarea.setSelectionRange(
                                start,
                                start + selected.length + 17,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-align-right"></i>
                        </button>
                      </div>

                      {/* Lists */}
                      <div className="flex items-center gap-1">
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              const lines = selected.split("\n");
                              const bulletedLines = lines
                                .map((line) => `• ${line}`)
                                .join("\n");

                              textarea.value = before + bulletedLines + after;
                              textarea.setSelectionRange(
                                start,
                                start + bulletedLines.length,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-list-ul"></i>
                        </button>
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              const lines = selected.split("\n");
                              const numberedLines = lines
                                .map((line, index) => `${index + 1}. ${line}`)
                                .join("\n");

                              textarea.value = before + numberedLines + after;
                              textarea.setSelectionRange(
                                start,
                                start + numberedLines.length,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          <i className="fas fa-list-ol"></i>
                        </button>
                      </div>

                      {/* Headers */}
                      <div className="flex items-center gap-1">
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              textarea.value = before + `# ${selected}` + after;
                              textarea.setSelectionRange(
                                start,
                                start + selected.length + 2,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          H1
                        </button>
                        <button
                          className="rounded bg-white/20 px-2 py-1 text-sm text-white hover:bg-white/30"
                          onClick={() => {
                            const textarea = document.querySelector("textarea");
                            if (textarea) {
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);

                              textarea.value =
                                before + `## ${selected}` + after;
                              textarea.setSelectionRange(
                                start,
                                start + selected.length + 3,
                              );
                              textarea.focus();
                            }
                          }}
                        >
                          H2
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={textareaValue}
                      onChange={(e) => {
                        setTextareaValue(e.target.value);
                        setEditedArticle({
                          ...editedArticle!,
                          content: e.target.value,
                        });
                      }}
                      rows={20}
                      className="w-full resize-none rounded-lg border-2 border-white/30 bg-white/10 p-4 text-white outline-none focus:border-cyan-400"
                      placeholder="Write your article content here... Use the toolbar above for formatting!"
                    />
                  </div>

                  <div className="rounded-lg border border-white/20 bg-white/5 p-4">
                    <h4 className="mb-2 text-sm font-medium text-white/70">
                      Preview:
                    </h4>
                    <div
                      className="text-sm text-white/90"
                      dangerouslySetInnerHTML={{
                        __html: convertToHtml(textareaValue),
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
