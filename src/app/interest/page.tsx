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
    <div className="min-h-screen bg-gradient-to-br from-[#a5b4fc] via-[#38bdf8] to-[#6366f1] px-6 py-16">
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
            className="mb-6 text-5xl font-extrabold text-white drop-shadow-[0_4px_32px_rgba(64,112,209,0.7)]"
          >
            Why Join Mind & Method?
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-3xl text-xl text-blue-200"
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
            className="mb-8 text-center text-4xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,112,209,0.5)]"
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
                className="rounded-2xl border border-white/20 bg-white/20 p-8 shadow-2xl backdrop-blur-xl"
              >
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-blue-100">
                  {item.description}
                </p>
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
            className="mb-8 text-center text-4xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,112,209,0.5)]"
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
                gradient: "from-blue-400 to-purple-500",
              },
              {
                icon: "🌟",
                title: "Personal Growth",
                description:
                  "Develop self-awareness and emotional intelligence. Understand yourself better and learn strategies for managing stress and challenges.",
                gradient: "from-green-400 to-blue-500",
              },
              {
                icon: "🤝",
                title: "Community Impact",
                description:
                  "Make a difference in your school community. Help promote mental health awareness and create a more supportive environment for everyone.",
                gradient: "from-purple-400 to-pink-500",
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
                <p className="text-blue-100">{item.description}</p>
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
            className="mb-8 text-center text-4xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,112,209,0.5)]"
          >
            Interactive Experience
          </motion.h2>
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="text-center"
          >
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/20 bg-white/20 p-8 shadow-2xl backdrop-blur-xl">
              <h3 className="mb-4 text-2xl font-bold text-white">
                🧠 Quick Anxiety Assessment
              </h3>
              <p className="mb-6 text-blue-100">
                Take a quick quiz to understand your stress levels and get
                personalized insights.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuiz(true)}
                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white transition-transform"
              >
                Take the Quiz
              </motion.button>
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
            className="mb-8 text-center text-4xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,112,209,0.5)]"
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
                gradient: "from-blue-400/30 to-purple-400/30",
              },
              {
                icon: "🎭",
                title: "Role-Playing",
                description: "Practice real-world scenarios",
                gradient: "from-green-400/30 to-blue-400/30",
              },
              {
                icon: "🧠",
                title: "Brain Games",
                description: "Test your cognitive abilities",
                gradient: "from-purple-400/30 to-pink-400/30",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="rounded-2xl border border-white/20 bg-white/20 p-6 shadow-2xl backdrop-blur-xl"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 flex h-48 w-full items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-4xl`}
                >
                  {item.icon}
                </motion.div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-blue-100">{item.description}</p>
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
            className="mx-auto max-w-4xl rounded-2xl border border-white/20 bg-white/20 p-8 shadow-2xl backdrop-blur-xl"
          >
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ready to Join?
            </h2>
            <p className="mb-6 text-lg text-blue-100">
              Take the first step toward understanding the human mind and making
              a difference in your community.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-700 px-8 py-4 text-lg font-bold text-white shadow-xl transition-transform"
            >
              Join Mind & Method
            </motion.button>
          </motion.div>
        </motion.section>
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
                        className="w-full rounded-lg bg-blue-100 p-3 text-left transition-colors hover:bg-blue-200"
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
                        className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
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
    </div>
  );
}
