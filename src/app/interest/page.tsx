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
      {/* Font Awesome CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      {/* Animated background with confetti and sparkles */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient background */}
        <div className="to-turquoise-500 absolute inset-0 bg-gradient-to-br from-teal-400 via-cyan-500" />

        {/* Sparkles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute h-1 w-1 rounded-full bg-cyan-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

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
                  title: "🧠 Psychology Exploration",
                  description:
                    "Dive deep into human behavior, cognitive processes, and mental health. Learn about memory, decision-making, and the fascinating ways our minds work.",
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

          {/* Why Join Section */}
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
              Why You Should Join
            </motion.h2>
            <motion.div
              variants={containerVariants}
              className="grid gap-8 lg:grid-cols-3"
            >
              {[
                {
                  icon: "🎯",
                  title: "Real-World Applications",
                  description:
                    "Apply psychology concepts to everyday situations. Learn skills that will help you in school, relationships, and future careers.",
                  gradient: "from-cyan-400 to-teal-500",
                },
                {
                  icon: "🌟",
                  title: "Personal Growth",
                  description:
                    "Develop self-awareness and emotional intelligence. Understand yourself better and learn strategies for managing stress and challenges.",
                  gradient: "from-teal-400 to-cyan-500",
                },
                {
                  icon: "🤝",
                  title: "Community Impact",
                  description:
                    "Make a difference in your school community. Help promote mental health awareness and create a more supportive environment for everyone.",
                  gradient: "from-cyan-500 to-teal-600",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-4xl`}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/90">{item.description}</p>
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

          {/* CTA Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="text-center"
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
                <h2 className="mb-4 text-4xl font-bold text-white">
                  Ready to Join?
                </h2>
                <p className="mb-6 text-xl text-white/90">
                  Take the first step toward understanding the human mind and
                  making a difference in your community.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-transform"
                >
                  Join Mind & Method
                </motion.button>
              </div>
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
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl"
          >
            {!showResults ? (
              <>
                <h3 className="mb-6 text-2xl font-bold text-gray-800">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </h3>
                <p className="mb-6 text-gray-700">
                  {quizQuestions[currentQuestion]?.question}
                </p>
                <div className="space-y-3">
                  {quizQuestions[currentQuestion]?.options.map(
                    (option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuizAnswer(option.score)}
                        className="w-full rounded-lg bg-cyan-100 p-3 text-left transition-colors hover:bg-cyan-200"
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
                      <p className={`mb-2 text-2xl font-bold ${result.color}`}>
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
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
