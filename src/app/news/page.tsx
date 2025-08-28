"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
    date: "August 28, 2025",
    title: "🎉 Welcome to Mind & Method!",
    content:
      "We're excited to announce the launch of our psychology club! Join us for our first meeting this Monday in Room 143. Come explore the fascinating world of psychology with us!",
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

interface NewsDraft {
  id?: number;
  title: string;
  content: string;
  category: string;
  priority: string;
  themeColor: string;
  date?: string;
  status?: string;
}

function isNewsDraft(d: unknown): d is NewsDraft {
  if (typeof d !== "object" || d === null) return false;
  const obj = d as Record<string, unknown>;
  return (
    typeof obj.title === "string" &&
    typeof obj.content === "string" &&
    typeof obj.category === "string" &&
    typeof obj.priority === "string" &&
    typeof obj.themeColor === "string"
  );
}

export default function NewsPage() {
  const [loggedInOfficer, setLoggedInOfficer] = useState<string | null>(null);
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    category: "Announcement",
    priority: "medium",
    themeColor: "cyan",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const [editingNews, setEditingNews] = useState<NewsDraft | null>(null);

  const [editingDraft, setEditingDraft] = useState<NewsDraft | null>(null);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribers, setSubscribers] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedSubscribers = localStorage.getItem("newsSubscribers");
      return savedSubscribers ? JSON.parse(savedSubscribers) : [];
    }
    return [];
  });
  const [showUnsubscribeForm, setShowUnsubscribeForm] = useState(false);
  const [unsubscribeEmail, setUnsubscribeEmail] = useState("");

  const [drafts, setDrafts] = useState<NewsDraft[]>(() => {
    if (typeof window !== "undefined") {
      const savedDrafts = localStorage.getItem("newsDrafts");
      const parsed = savedDrafts ? JSON.parse(savedDrafts) : [];
      return parsed.filter(isNewsDraft);
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedInOfficer(localStorage.getItem("loggedInOfficer"));
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
  }, []);

  const isBlogger = loggedInOfficer === "Blogger";

  const handleSaveDraft = () => {
    setIsSavingDraft(true);

    setTimeout(() => {
      const draft = {
        ...newNews,
        id: Date.now(),
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status: "draft",
      };

      const updatedDrafts = [...drafts, draft];
      setDrafts(updatedDrafts);
      localStorage.setItem("newsDrafts", JSON.stringify(updatedDrafts));
      setShowAddNewsModal(false);
      setIsSavingDraft(false);
      setNewNews({
        title: "",
        content: "",
        category: "Announcement",
        priority: "medium",
        themeColor: "cyan",
      });
    }, 2000);
  };

  const handleEditNews = () => {
    console.log("Updating news:", editingNews);
    setShowEditModal(false);
    setEditingNews(null);
  };

  const handleEditDraft = () => {
    const updatedDrafts = drafts.map((draft) =>
      draft.id === editingDraft?.id ? (editingDraft as NewsDraft) : draft,
    );
    setDrafts(updatedDrafts);
    localStorage.setItem("newsDrafts", JSON.stringify(updatedDrafts));
    setShowEditModal(false);
    setEditingDraft(null);
  };

  const handleSubscribe = (email: string) => {
    if (email && !subscribers.includes(email)) {
      const updatedSubscribers = [...subscribers, email];
      setSubscribers(updatedSubscribers);
      localStorage.setItem(
        "newsSubscribers",
        JSON.stringify(updatedSubscribers),
      );
      alert(`Thank you! You've been subscribed with: ${email}`);
      setEmail("");
      setShowEmailForm(false);
    } else if (subscribers.includes(email)) {
      alert("You're already subscribed with this email!");
    }
  };

  const sendNewsletterToSubscribers = (
    articleTitle: string,
    articleContent: string,
  ) => {
    if (subscribers.length > 0) {
      // In a real app, you'd send actual emails here
      console.log(
        `Sending newsletter to ${subscribers.length} subscribers about: ${articleTitle}`,
      );
      console.log("Subscribers:", subscribers);
      console.log("Article content:", articleContent);

      // For demo purposes, show an alert
      alert(
        `Newsletter sent to ${subscribers.length} subscribers about: ${articleTitle}`,
      );
    }
  };

  const handleUnsubscribe = (email: string) => {
    if (email && subscribers.includes(email)) {
      const updatedSubscribers = subscribers.filter((sub) => sub !== email);
      setSubscribers(updatedSubscribers);
      localStorage.setItem(
        "newsSubscribers",
        JSON.stringify(updatedSubscribers),
      );
      alert(`You've been unsubscribed from: ${email}`);
      setUnsubscribeEmail("");
      setShowUnsubscribeForm(false);
    } else if (email && !subscribers.includes(email)) {
      alert("This email is not in our subscriber list.");
    }
  };

  const getThemeButtonColor = (themeColor: string) => {
    switch (themeColor) {
      case "cyan":
        return "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500";
      case "blue":
        return "from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500";
      case "green":
        return "from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500";
      case "purple":
        return "from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500";
      case "pink":
        return "from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500";
      case "orange":
        return "from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500";
      default:
        return "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500";
    }
  };

  const getThemeColor = (themeColor: string) => {
    switch (themeColor) {
      case "cyan":
        return "text-cyan-300 border-cyan-400 focus:border-cyan-400";
      case "blue":
        return "text-blue-300 border-blue-400 focus:border-blue-400";
      case "green":
        return "text-green-300 border-green-400 focus:border-green-400";
      case "purple":
        return "text-purple-300 border-purple-400 focus:border-purple-400";
      case "pink":
        return "text-pink-300 border-pink-400 focus:border-pink-400";
      case "orange":
        return "text-orange-300 border-orange-400 focus:border-orange-400";
      default:
        return "text-cyan-300 border-cyan-400 focus:border-cyan-400";
    }
  };

  const deleteDraft = (draftId: number) => {
    const updatedDrafts = drafts.filter((draft) => draft.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem("newsDrafts", JSON.stringify(updatedDrafts));
  };

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

          {isBlogger && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center justify-center space-x-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddNewsModal(true)}
                className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 font-semibold text-white shadow-lg transition-all hover:from-cyan-400 hover:to-blue-500"
              >
                <i className="fas fa-plus mr-2"></i>
                Add News
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDrafts(!showDrafts)}
                className={`rounded-full px-4 py-2 font-semibold text-white shadow-lg transition-all ${
                  showDrafts
                    ? "border-2 border-green-400 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500"
                }`}
              >
                <i className="fas fa-drafting-compass mr-2"></i>
                Drafts ({drafts.length})
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2 font-semibold text-white shadow-lg transition-all hover:from-purple-400 hover:to-pink-500"
              >
                <i className="fas fa-chart-line mr-2"></i>
                Analytics
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 font-semibold text-white shadow-lg transition-all hover:from-orange-400 hover:to-red-500"
              >
                <i className="fas fa-cog mr-2"></i>
                Settings
              </motion.button>
            </motion.div>
          )}

          {isBlogger && showDrafts && drafts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h3 className="mb-4 text-2xl font-bold text-white/70">
                <i className="fas fa-drafting-compass mr-2"></i>
                Drafts ({drafts.length})
              </h3>
              <div className="grid max-w-2xl gap-8 md:grid-cols-1 lg:grid-cols-1">
                {drafts.map((draft) => (
                  <motion.div
                    key={draft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover="hover"
                    className={`group relative overflow-hidden rounded-3xl border-4 ${getPriorityColor(draft.priority)} cursor-pointer p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/30`}
                    onClick={() => {
                      window.location.href = `/news/draft/${draft.id}`;
                    }}
                  >
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
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
                    <div className="mb-4 text-3xl">
                      {getCategoryIcon(draft.category)}
                    </div>

                    <p className="mb-3 text-sm text-white/70">{draft.date}</p>

                    <h3 className="mb-4 text-xl font-bold text-white group-hover:text-cyan-300">
                      {draft.title}
                    </h3>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEditingDraft(draft);
                        setShowEditModal(true);
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                      className="mb-4 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/30"
                    >
                      <i className="fas fa-edit mr-1"></i>
                      Edit
                    </motion.button>

                    <p className="mb-4 text-sm leading-relaxed text-white/90">
                      {draft.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                        {draft.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="rounded-full bg-gray-600 px-3 py-1 text-xs font-semibold text-white/70">
                          DRAFT
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deleteDraft(draft.id || 0);
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                          }}
                          className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-300 transition-all hover:bg-red-500/30"
                        >
                          <i className="fas fa-trash mr-1"></i>
                          Delete
                        </motion.button>
                        <div className="text-cyan-300">
                          <i className="fas fa-arrow-right"></i>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 to-teal-500/20 opacity-0 transition-opacity group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {!showDrafts && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
              className="flex justify-center"
            >
              <div className="grid max-w-2xl gap-8 md:grid-cols-1 lg:grid-cols-1">
                {announcements.map((announcement, _index) => (
                  <motion.div
                    key={announcement.id}
                    variants={cardVariants}
                    whileHover="hover"
                    className={`group relative overflow-hidden rounded-3xl border-4 ${getPriorityColor(announcement.priority)} cursor-pointer p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/30`}
                    onClick={() => {
                      window.location.href = `/news/${announcement.id}`;
                    }}
                  >
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

                    <div className="mb-4 text-3xl">
                      {getCategoryIcon(announcement.category)}
                    </div>

                    <p className="mb-3 text-sm text-white/70">
                      {announcement.date}
                    </p>

                    <h3 className="mb-4 text-xl font-bold text-white group-hover:text-cyan-300">
                      {announcement.title}
                    </h3>

                    {isBlogger && !showDrafts && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = `/news/${announcement.id}/edit`;
                        }}
                        className="mb-4 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/30"
                      >
                        <i className="fas fa-edit mr-1"></i>
                        Edit
                      </motion.button>
                    )}

                    <p className="mb-4 text-sm leading-relaxed text-white/90">
                      {announcement.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                        {announcement.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/news/${announcement.id}`}
                          passHref
                          legacyBehavior
                        >
                          <a
                            className="text-cyan-300"
                            aria-label="Read full article"
                          >
                            <i className="fas fa-arrow-right"></i>
                          </a>
                        </Link>
                      </div>
                    </div>

                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 to-teal-500/20 opacity-0 transition-opacity group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

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
                <p className="mb-4 text-sm text-white/70">
                  Current subscribers: {subscribers.length}
                </p>
                {!showEmailForm ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEmailForm(true)}
                    className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:from-cyan-400 hover:to-teal-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                  >
                    Subscribe to Updates 🚀
                  </motion.button>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email here"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full max-w-md rounded-lg border-2 border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-all focus:border-cyan-400 focus:outline-none"
                    />
                    <div className="flex justify-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (email) {
                            handleSubscribe(email);
                          }
                        }}
                        className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2 font-bold text-white shadow-lg transition-all hover:from-green-400 hover:to-emerald-500"
                      >
                        Subscribe
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setShowEmailForm(false);
                          setEmail("");
                        }}
                        className="rounded-full bg-gradient-to-r from-gray-500 to-gray-600 px-6 py-2 font-bold text-white shadow-lg transition-all hover:from-gray-400 hover:to-gray-500"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Unsubscribe Form */}
                <div className="mt-6 border-t border-white/20 pt-6">
                  <p className="mb-4 text-sm text-white/70">
                    Need to unsubscribe? Enter your email below:
                  </p>
                  {!showUnsubscribeForm ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowUnsubscribeForm(true)}
                      className="rounded-full bg-gradient-to-r from-red-500 to-pink-600 px-6 py-2 text-sm font-bold text-white shadow-lg transition-all hover:from-red-400 hover:to-pink-500"
                    >
                      Unsubscribe
                    </motion.button>
                  ) : (
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Enter your email to unsubscribe"
                        value={unsubscribeEmail}
                        onChange={(e) => setUnsubscribeEmail(e.target.value)}
                        className="w-full max-w-md rounded-lg border-2 border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-all focus:border-red-400 focus:outline-none"
                      />
                      <div className="flex justify-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (unsubscribeEmail) {
                              handleUnsubscribe(unsubscribeEmail);
                            }
                          }}
                          className="rounded-full bg-gradient-to-r from-red-500 to-pink-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:from-red-400 hover:to-pink-500"
                        >
                          Unsubscribe
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setShowUnsubscribeForm(false);
                            setUnsubscribeEmail("");
                          }}
                          className="rounded-full bg-gradient-to-r from-gray-500 to-gray-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:from-gray-400 hover:to-gray-500"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {showAddNewsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowAddNewsModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-2xl rounded-3xl border-6 ${getThemeColor(newNews.themeColor).split(" ")[1]}/70 bg-gradient-to-br from-white/40 to-white/20 p-8 shadow-2xl backdrop-blur-xl`}
          >
            <button
              onClick={() => setShowAddNewsModal(false)}
              className="absolute top-4 right-4 text-white/70 transition-colors hover:text-white"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            <div className="text-center">
              <div className="mb-6">
                <i
                  className={`fas fa-newspaper mb-4 text-4xl ${getThemeColor(newNews.themeColor).split(" ")[0]}`}
                ></i>
                <h2 className="mb-2 text-2xl font-bold text-white">
                  Add News Article
                </h2>
                <p className="text-white/70">
                  Create a new announcement or news article
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveDraft();
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-left text-sm font-medium text-white/90">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newNews.title}
                      onChange={(e) =>
                        setNewNews({ ...newNews, title: e.target.value })
                      }
                      className={`w-full rounded-lg border-2 border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-all focus:outline-none ${getThemeColor(newNews.themeColor)?.split(" ")[2] || "focus:border-cyan-400"}`}
                      placeholder="Enter article title"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-left text-sm font-medium text-white/90">
                      Content
                    </label>
                    <textarea
                      value={newNews.content}
                      onChange={(e) =>
                        setNewNews({ ...newNews, content: e.target.value })
                      }
                      rows={4}
                      className={`w-full rounded-lg border-2 border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-all focus:outline-none ${getThemeColor(newNews.themeColor)?.split(" ")[2] || "focus:border-cyan-400"}`}
                      placeholder="Enter article content"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-left text-sm font-medium text-white/90">
                        Category
                      </label>
                      <select
                        value={newNews.category}
                        onChange={(e) =>
                          setNewNews({ ...newNews, category: e.target.value })
                        }
                        className={`w-full rounded-lg border-2 border-white/30 bg-white/10 px-4 py-3 text-white backdrop-blur-sm transition-all focus:outline-none ${getThemeColor(newNews.themeColor)?.split(" ")[2] || "focus:border-cyan-400"}`}
                      >
                        <option value="Announcement">Announcement</option>
                        <option value="Event">Event</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Opportunity">Opportunity</option>
                        <option value="Recap">Recap</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-left text-sm font-medium text-white/90">
                        Priority
                      </label>
                      <select
                        value={newNews.priority}
                        onChange={(e) =>
                          setNewNews({ ...newNews, priority: e.target.value })
                        }
                        className={`w-full rounded-lg border-2 border-white/30 bg-white/10 px-4 py-3 text-white backdrop-blur-sm transition-all focus:outline-none ${getThemeColor(newNews.themeColor)?.split(" ")[2] || "focus:border-cyan-400"}`}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-left text-sm font-medium text-white/90">
                        Theme Color
                      </label>
                      <select
                        value={newNews.themeColor}
                        onChange={(e) =>
                          setNewNews({ ...newNews, themeColor: e.target.value })
                        }
                        className={`w-full rounded-lg border-2 border-white/30 bg-white/10 px-4 py-3 text-white backdrop-blur-sm transition-all focus:outline-none ${getThemeColor(newNews.themeColor)?.split(" ")[2] || "focus:border-cyan-400"}`}
                      >
                        <option value="cyan">Cyan</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="purple">Purple</option>
                        <option value="pink">Pink</option>
                        <option value="orange">Orange</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddNewsModal(false)}
                    className="flex-1 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSavingDraft}
                    whileHover={{ scale: isSavingDraft ? 1 : 1.05 }}
                    whileTap={{ scale: isSavingDraft ? 1 : 0.95 }}
                    className={`flex-1 rounded-lg px-6 py-3 text-lg font-bold text-white shadow-xl transition-all focus:ring-2 focus:ring-cyan-300 focus:outline-none ${
                      isSavingDraft
                        ? "cursor-not-allowed bg-gray-500"
                        : `bg-gradient-to-r ${getThemeButtonColor(newNews.themeColor)}`
                    }`}
                  >
                    {isSavingDraft ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Saving Draft...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save mr-2"></i>
                        Save Draft
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showEditModal && (editingNews || editingDraft) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => {
            setShowEditModal(false);
            setEditingNews(null);
            setEditingDraft(null);
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl border-6 border-cyan-800/70 bg-gradient-to-br from-white/40 to-white/20 p-8 shadow-2xl backdrop-blur-xl"
          >
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditingNews(null);
                setEditingDraft(null);
              }}
              className="absolute top-4 right-4 text-white/70 transition-colors hover:text-white"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            <div className="text-center">
              <div className="mb-6">
                <i className="fas fa-edit mb-4 text-4xl text-cyan-300"></i>
                <h2 className="mb-2 text-2xl font-bold text-white">
                  {editingDraft ? "Edit Draft" : "Edit News Article"}
                </h2>
                <p className="text-white/70">
                  {editingDraft
                    ? "Update the draft content"
                    : "Update the existing article content"}
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (editingDraft) {
                    handleEditDraft();
                  } else {
                    handleEditNews();
                  }
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-left text-sm font-medium text-white/90">
                      Title
                    </label>
                    <input
                      type="text"
                      value={
                        editingDraft ? editingDraft.title : editingNews?.title
                      }
                      onChange={(e) => {
                        if (editingDraft) {
                          setEditingDraft({
                            ...editingDraft,
                            title: e.target.value || editingDraft?.title || "",
                            content: editingDraft?.content || "",
                            category: editingDraft?.category || "",
                            priority: editingDraft?.priority || "",
                            themeColor: editingDraft?.themeColor || "",
                            date: editingDraft?.date,
                            status: editingDraft?.status,
                            id: editingDraft?.id,
                          });
                        } else {
                          setEditingNews({
                            ...editingNews,
                            title: e.target.value || editingNews?.title || "",
                            content: editingNews?.content || "",
                            category: editingNews?.category || "",
                            priority: editingNews?.priority || "",
                            themeColor: editingNews?.themeColor || "",
                            date: editingNews?.date,
                            status: editingNews?.status,
                            id: editingNews?.id,
                          });
                        }
                      }}
                      className="w-full rounded-lg border-2 border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-all focus:border-cyan-400 focus:outline-none"
                      placeholder="Enter article title"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-left text-sm font-medium text-white/90">
                      Content
                    </label>
                    <textarea
                      value={
                        editingDraft
                          ? editingDraft.content
                          : editingNews?.content
                      }
                      onChange={(e) => {
                        if (editingDraft) {
                          setEditingDraft({
                            ...editingDraft,
                            title: editingDraft?.title || "",
                            content:
                              e.target.value || editingDraft?.content || "",
                            category: editingDraft?.category || "",
                            priority: editingDraft?.priority || "",
                            themeColor: editingDraft?.themeColor || "",
                            date: editingDraft?.date,
                            status: editingDraft?.status,
                            id: editingDraft?.id,
                          });
                        } else {
                          setEditingNews({
                            ...editingNews,
                            title: editingNews?.title || "",
                            content:
                              e.target.value || editingNews?.content || "",
                            category: editingNews?.category || "",
                            priority: editingNews?.priority || "",
                            themeColor: editingNews?.themeColor || "",
                            date: editingNews?.date,
                            status: editingNews?.status,
                            id: editingNews?.id,
                          });
                        }
                      }}
                      rows={4}
                      className="w-full rounded-lg border-2 border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-all focus:border-cyan-400 focus:outline-none"
                      placeholder="Enter article content"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-left text-sm font-medium text-white/90">
                        Category
                      </label>
                      <select
                        value={
                          editingDraft
                            ? editingDraft.category
                            : editingNews?.category
                        }
                        onChange={(e) => {
                          if (editingDraft) {
                            setEditingDraft({
                              ...editingDraft,
                              title: editingDraft?.title || "",
                              content: editingDraft?.content || "",
                              category:
                                e.target.value || editingDraft?.category || "",
                              priority: editingDraft?.priority || "",
                              themeColor: editingDraft?.themeColor || "",
                              date: editingDraft?.date,
                              status: editingDraft?.status,
                              id: editingDraft?.id,
                            });
                          } else {
                            setEditingNews({
                              ...editingNews,
                              title: editingNews?.title || "",
                              content: editingNews?.content || "",
                              category:
                                e.target.value || editingNews?.category || "",
                              priority: editingNews?.priority || "",
                              themeColor: editingNews?.themeColor || "",
                              date: editingNews?.date,
                              status: editingNews?.status,
                              id: editingNews?.id,
                            });
                          }
                        }}
                        className="w-full rounded-lg border-2 border-white/30 bg-white/10 px-4 py-3 text-white backdrop-blur-sm transition-all focus:border-cyan-400 focus:outline-none"
                      >
                        <option value="Announcement">Announcement</option>
                        <option value="Event">Event</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Opportunity">Opportunity</option>
                        <option value="Recap">Recap</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-left text-sm font-medium text-white/90">
                        Priority
                      </label>
                      <select
                        value={
                          editingDraft
                            ? editingDraft.priority
                            : editingNews?.priority
                        }
                        onChange={(e) => {
                          if (editingDraft) {
                            setEditingDraft({
                              ...editingDraft,
                              title: editingDraft?.title || "",
                              content: editingDraft?.content || "",
                              category: editingDraft?.category || "",
                              priority:
                                e.target.value || editingDraft?.priority || "",
                              themeColor: editingDraft?.themeColor || "",
                              date: editingDraft?.date,
                              status: editingDraft?.status,
                              id: editingDraft?.id,
                            });
                          } else {
                            setEditingNews({
                              ...editingNews,
                              title: editingNews?.title || "",
                              content: editingNews?.content || "",
                              category: editingNews?.category || "",
                              priority:
                                e.target.value || editingNews?.priority || "",
                              themeColor: editingNews?.themeColor || "",
                              date: editingNews?.date,
                              status: editingNews?.status,
                              id: editingNews?.id,
                            });
                          }
                        }}
                        className="w-full rounded-lg border-2 border-white/30 bg-white/10 px-4 py-3 text-white backdrop-blur-sm transition-all focus:border-cyan-400 focus:outline-none"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingNews(null);
                      setEditingDraft(null);
                    }}
                    className="flex-1 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-lg font-bold text-white shadow-xl transition-all hover:from-cyan-400 hover:to-blue-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                  >
                    <i className="fas fa-save mr-2"></i>
                    Update Article
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
