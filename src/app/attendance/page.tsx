"use client";
import { motion } from "framer-motion";

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
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.2,
    },
  },
};

export default function AttendancePage() {
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
            backgroundImage: "url(/bg/2.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="min-h-screen px-4 py-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-16 text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="mb-2 text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_32px_rgba(64,224,208,0.7)] sm:text-[6rem]"
            >
              Attendance
            </motion.h1>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="mb-8 flex justify-center"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-3 shadow-2xl backdrop-blur-xl sm:p-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-teal-500/20"
              />

              <motion.div
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute inset-0 bg-gradient-to-l from-purple-400/15 to-pink-400/15"
              />

              <div className="relative z-10 rounded-xl border-2 border-cyan-400/30 bg-white/5 p-2">
                <div className="w-full overflow-hidden rounded-lg">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSfUacAKaMOGUIqt2aSJM9tk0BOBU6Q42Ot-OAipjdYQLmdgEQ/viewform?embedded=true"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title="Mind & Method Club Attendance Form"
                    className="h-[500px] w-full sm:h-[600px] lg:h-[700px]"
                    style={{ minHeight: "500px" }}
                  >
                    Loading…
                  </iframe>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
