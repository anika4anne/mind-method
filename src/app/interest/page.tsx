"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface QuizQuestion {
  id: number;
  question: string;
  options: { text: string; score: number }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How often do you feel overwhelmed by schoolwork?",
    options: [
      { text: "Never", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Often", score: 3 },
      { text: "Always", score: 4 },
    ],
  },
  {
    id: 2,
    question: "Do you have trouble sleeping due to stress?",
    options: [
      { text: "Rarely", score: 1 },
      { text: "Occasionally", score: 2 },
      { text: "Frequently", score: 3 },
      { text: "Almost every night", score: 4 },
    ],
  },
  {
    id: 3,
    question: "How do you handle social situations?",
    options: [
      { text: "Very comfortable", score: 1 },
      { text: "Somewhat comfortable", score: 2 },
      { text: "Sometimes anxious", score: 3 },
      { text: "Very anxious", score: 4 },
    ],
  },
];

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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2,
    },
  },
};

export default function InterestPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleQuizAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getAnxietyLevel = (totalScore: number) => {
    if (totalScore <= 6)
      return {
        level: "Low",
        color: "text-green-400",
        message: "You're managing stress well!",
      };
    if (totalScore <= 9)
      return {
        level: "Moderate",
        color: "text-yellow-400",
        message: "Some stress management techniques could help.",
      };
    return {
      level: "High",
      color: "text-red-400",
      message: "Consider talking to a counselor or mental health professional.",
    };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores([]);
    setShowResults(false);
    setShowQuiz(false);
  };

  return (
    <>
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
              Why Join Mind & Method?
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-3xl text-2xl font-semibold text-white"
            >
              Discover the fascinating world of psychology while building skills
              that will serve you for life.
            </motion.p>

            {/* Prominent Interest Form Section */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-col items-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-4 text-center"
              >
                <span className="text-3xl">✨</span>
                <p className="mt-2 text-lg font-medium text-cyan-300">
                  Wanna sign up? Click here!
                </p>
              </motion.div>

              <motion.a
                href="https://forms.gle/6CfjQwtKRJtuhyQX7"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.08,
                  y: -3,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group hover:shadow-3xl relative inline-block overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-5 text-xl font-bold text-white shadow-2xl transition-all duration-300"
              >
                {/* White glowing border */}
                <div className="absolute inset-0 rounded-full bg-white/30 blur-sm" />
                <div className="absolute inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />

                <span className="relative z-10 flex items-center gap-3">
                  📝 Interest Form
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-lg"
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* What We Do Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="mb-8 text-center text-5xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,224,208,0.5)]"
            >
              What We Do
            </motion.h2>
            <motion.div
              variants={containerVariants}
              className="grid gap-8 md:grid-cols-2"
            >
              {[
                {
                  title: "🧠 Explore The Field of Pyscology",
                  description:
                    "Learn more about human behavior, mental health, and more! ",
                },
                {
                  title: "🔍 Forensic Challenges",
                  description:
                    "Solve psychological mysteries and case studies. Develop critical thinking skills through hands-on problem-solving activities.",
                },
                {
                  title: "💡 Skill Building",
                  description:
                    "Enhance your observation, communication, and analytical skills. Learn to understand people better and improve your relationships.",
                },
                {
                  title: "🤝 Mental Health Advocacy",
                  description:
                    "Support mental health awareness in our school community. Learn about wellness strategies and help create a supportive environment.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative overflow-hidden rounded-3xl border-4 border-white/30 bg-white/20 p-8 shadow-2xl backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/30"
                >
                  <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-cyan-300">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-white/90">
                    {item.description}
                  </p>
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 to-teal-500/20 opacity-0 transition-opacity group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Interactive Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="mb-8 text-center text-5xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,224,208,0.5)]"
            >
              Interactive Experience
            </motion.h2>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="text-center"
            >
              <div className="relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-8 shadow-2xl backdrop-blur-xl">
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
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    🧠 Quick Anxiety Assessment
                  </h3>
                  <p className="mb-6 text-white/90">
                    Take a quick quiz to understand your stress levels and get
                    personalized insights.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowQuiz(true)}
                    className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-4 font-bold text-white transition-transform"
                  >
                    Take the Quiz
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* Meeting Information Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="mb-8 text-center text-5xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,224,208,0.5)]"
            >
              Meeting Information 📅
            </motion.h2>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="text-center"
            >
              <div className="relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-8 shadow-2xl backdrop-blur-xl">
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
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="text-center">
                      <h3 className="mb-4 text-3xl font-bold text-white">
                        📍 Room 171
                      </h3>
                      <p className="text-lg text-white/90">
                        Join us in Room 171 for all our exciting psychology
                        activities!
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="mb-4 text-3xl font-bold text-white">
                        ⏰ Every Thursday
                      </h3>
                      <p className="text-lg text-white/90">
                        Meetings held every Thursday after school
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* Gallery Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="mb-8 text-center text-5xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,224,208,0.5)]"
            >
              Club Activities
            </motion.h2>
            <motion.div
              variants={containerVariants}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  icon: "🧩",
                  title: "Case Studies",
                  description: "Solve real psychological mysteries",
                  gradient: "from-cyan-400/30 to-teal-400/30",
                },
                {
                  icon: "🎭",
                  title: "Role-Playing",
                  description: "Practice real-world scenarios",
                  gradient: "from-teal-400/30 to-cyan-400/30",
                },
                {
                  icon: "🧠",
                  title: "Brain Games",
                  description: "Test your cognitive abilities",
                  gradient: "from-cyan-500/30 to-teal-500/30",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative overflow-hidden rounded-3xl border-4 border-white/30 bg-white/20 p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/30"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-4 flex h-48 w-full items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-4xl`}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="mb-2 text-xl font-bold text-white group-hover:text-cyan-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/90">{item.description}</p>
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 to-teal-500/20 opacity-0 transition-opacity group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <div
            className="animate-gradient-x rounded-3xl bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-[length:200%_200%] p-4 shadow-2xl"
            style={{ backgroundSize: "400% 400%" }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl"
            >
              {!showResults ? (
                <>
                  <h3 className="mb-6 bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-2xl font-extrabold text-transparent">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </h3>
                  <p className="mb-6 text-lg font-semibold text-cyan-700 dark:text-cyan-300">
                    {quizQuestions[currentQuestion]?.question}
                  </p>
                  <div className="space-y-4">
                    {quizQuestions[currentQuestion]?.options.map(
                      (option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{
                            scale: 1.03,
                            x: 8,
                            boxShadow:
                              "0 0 0 4px #67e8f9, 0 8px 32px rgba(34,211,238,0.15)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuizAnswer(option.score)}
                          className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-3 text-left font-bold text-white shadow-md transition-all duration-200 hover:from-cyan-400 hover:to-teal-400 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                        >
                          {option.text}
                        </motion.button>
                      ),
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="mb-6 text-2xl font-bold text-gray-800">
                    Your Results
                  </h3>
                  {(() => {
                    const totalScore = scores.reduce((a, b) => a + b, 0);
                    const result = getAnxietyLevel(totalScore);
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <p
                          className={`mb-2 text-2xl font-bold ${result.color}`}
                        >
                          {result.level} Anxiety Level
                        </p>
                        <p className="mb-6 text-gray-700">{result.message}</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={resetQuiz}
                          className="rounded-lg bg-cyan-600 px-6 py-2 text-white hover:bg-cyan-700"
                        >
                          Take Quiz Again
                        </motion.button>
                      </motion.div>
                    );
                  })()}
                </>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={resetQuiz}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300 hover:text-gray-800"
              >
                ✕
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}
