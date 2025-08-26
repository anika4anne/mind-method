"use client";
import { motion } from "framer-motion";
import Link from "next/link";
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

interface Draft {
  id: number;
  title: string;
  content: string;
  category: string;
  priority: string;
  date: string;
  themeColor?: string;
}

export default async function DraftDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [draft, setDraft] = useState<Draft | null>(null);
  const [loggedInOfficer, setLoggedInOfficer] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDraft, setEditedDraft] = useState<Draft | null>(null);
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedInOfficer(localStorage.getItem("loggedInOfficer"));


      const savedDrafts = localStorage.getItem("newsDrafts");
      if (savedDrafts) {
        const drafts = JSON.parse(savedDrafts);
        const foundDraft = drafts.find((d: Draft) => d.id.toString() === id);
        if (foundDraft) {
          setDraft(foundDraft);
          setEditedDraft(foundDraft);
          setTextareaValue(foundDraft.content || "");
        }
      }
    }

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
  }, [id]);

  const isBlogger = loggedInOfficer === "Blogger";

  const handleSaveChanges = () => {
    const updatedDraft = {
      ...editedDraft!,
      content: textareaValue, 
    };

    const savedDrafts = localStorage.getItem("newsDrafts");
    if (savedDrafts) {
      const drafts = JSON.parse(savedDrafts);
      const updatedDrafts = drafts.map((d: Draft) =>
        d.id === updatedDraft.id ? updatedDraft : d,
      );
      localStorage.setItem("newsDrafts", JSON.stringify(updatedDrafts));
      setDraft(updatedDraft);
      setEditedDraft(updatedDraft);
    }
    setIsEditing(false);
  };

  if (!draft) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">
            Draft Not Found
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
              className="inline-flex items-center text-cyan-300 transition-colors hover:text-cyan-200"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to News
            </Link>

            {isBlogger && (
              <div className="flex items-center space-x-3">
                {isEditing ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveChanges}
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
                        setEditedDraft(draft);
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
                    Edit Draft
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>


          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-8"
          >
            <motion.div
              variants={itemVariants}
              className={`relative overflow-hidden rounded-3xl border-4 ${getPriorityColor(draft.priority)} p-8 shadow-2xl backdrop-blur-sm`}
            >

              <div className="absolute top-6 right-6">
                <span
                  className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                    draft.priority === "high"
                      ? "bg-red-500 text-white"
                      : draft.priority === "medium"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-500 text-white"
                  }`}
                >
                  {draft.priority.toUpperCase()}
                </span>
              </div>


              <div className="mb-6 text-4xl">
                {getCategoryIcon(draft.category)}
              </div>


              <p className="mb-4 text-sm text-white/70">{draft.date}</p>


              {isEditing ? (
                <input
                  type="text"
                  value={editedDraft?.title || ""}
                  onChange={(e) =>
                    setEditedDraft({
                      ...editedDraft!,
                      title: e.target.value,
                    })
                  }
                  className="mb-4 w-full border-none bg-transparent text-4xl font-black text-white drop-shadow-[0_4px_32px_rgba(64,224,208,0.7)] outline-none md:text-5xl"
                />
              ) : (
                <h1 className="mb-6 text-4xl font-black text-white drop-shadow-[0_4px_32px_rgba(64,224,208,0.7)] md:text-5xl">
                  {editedDraft?.title || draft.title}
                </h1>
              )}


              <div className="mb-8">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/70">
                        Draft Content
                      </label>

                      <ReactQuill
                        value={textareaValue}
                        onChange={(content) => {
                          setTextareaValue(content);
                          setEditedDraft({
                            ...editedDraft!,
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
                      __html: editedDraft?.content || draft.content,
                    }}
                  />
                )}
              </div>


              <div className="flex items-center justify-between">
                <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                  {draft.category}
                </span>
                <div className="flex items-center space-x-3">
                  <span className="rounded-full bg-gray-600 px-4 py-2 text-sm font-semibold text-white/70">
                    DRAFT
                  </span>
                  {isBlogger && (
                    <button className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 transition-all hover:bg-red-500/30">
                      <i className="fas fa-trash mr-2"></i>
                      Delete Draft
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>


          {isBlogger && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex space-x-4">
                <button className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-green-400 hover:to-emerald-500">
                  <i className="fas fa-paper-plane mr-2"></i>
                  Publish Draft
                </button>
                <button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-purple-400 hover:to-pink-500">
                  <i className="fas fa-share mr-2"></i>
                  Share Draft
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
