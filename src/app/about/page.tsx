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

export default function EventsPage() {
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
              Upcoming Events <i className="fas fa-calendar-alt"></i>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-3xl text-2xl font-semibold text-white"
            >
              Stay updated with all our psychology club events, meetings, and
              activities!
            </motion.p>
          </motion.div>

          {/* Calendar Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="mb-16"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-8 shadow-2xl backdrop-blur-xl"
            >
              <div className="mb-6 text-center">
                <h2 className="mb-4 text-3xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,224,208,0.5)]">
                  <i className="fas fa-calendar-check mr-3"></i>
                  Club Calendar
                </h2>
                <p className="text-white/90">
                  View all upcoming events, meetings, and activities in our
                  interactive calendar.
                </p>
              </div>

              {/* Google Calendar Embed Placeholder */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-teal-500/10 p-6">
                <div className="mb-4 flex items-center justify-center space-x-4">
                  <i className="fas fa-calendar-plus text-2xl text-cyan-300"></i>
                  <h3 className="text-xl font-semibold text-white">
                    Google Calendar
                  </h3>
                </div>

                {/* Calendar Embed Instructions */}
                <div className="text-center">
                  <div className="mb-4 rounded-xl border border-cyan-400/30 bg-white/10 p-4">
                    <h4 className="mb-2 text-lg font-semibold text-cyan-300">
                      <i className="fas fa-info-circle mr-2"></i>
                      Embed Your Calendar
                    </h4>
                    <p className="mb-3 text-white/90">
                      To embed your Google Calendar here:
                    </p>
                    <ol className="space-y-2 text-left text-sm text-white/90">
                      <li>1. Go to your Google Calendar</li>
                      <li>
                        2. Click the three dots next to your calendar name
                      </li>
                      <li>3. Select "Settings and sharing"</li>
                      <li>4. Scroll down to "Integrate calendar"</li>
                      <li>5. Copy the "Embed code"</li>
                      <li>
                        6. Replace the placeholder below with your embed code
                      </li>
                    </ol>
                  </div>

                  {/* Placeholder for Google Calendar Embed */}
                  <div className="rounded-xl border-2 border-dashed border-cyan-400/30 bg-white/5 p-8">
                    <i className="fas fa-calendar-plus mb-4 text-4xl text-cyan-300"></i>
                    <p className="mb-4 text-white/70">
                      Your Google Calendar will appear here
                    </p>
                    <div className="rounded-lg bg-white/10 p-4 text-left">
                      <code className="text-xs text-cyan-300">
                        &lt;iframe
                        src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID"&gt;&lt;/iframe&gt;
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Event Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-3xl border-4 border-cyan-400/30 bg-gradient-to-br from-cyan-400/20 to-teal-500/20 p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/30"
            >
              <div className="mb-4 text-3xl">
                <i className="fas fa-users text-cyan-300"></i>
              </div>
              <h3 className="mb-4 text-xl font-bold text-white group-hover:text-cyan-300">
                Regular Meetings
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-white/90">
                Join us every Thursday at 3:30 PM in Room 171 for our weekly
                club meetings.
              </p>
              <div className="flex items-center text-cyan-300">
                <i className="fas fa-clock mr-2"></i>
                <span className="text-sm">Thursdays, 3:30 PM</span>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-3xl border-4 border-yellow-400/30 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-yellow-400/50 hover:bg-white/30"
            >
              <div className="mb-4 text-3xl">
                <i className="fas fa-flask text-yellow-300"></i>
              </div>
              <h3 className="mb-4 text-xl font-bold text-white group-hover:text-yellow-300">
                Psychology Workshops
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-white/90">
                Hands-on psychology experiments and interactive learning
                sessions.
              </p>
              <div className="flex items-center text-yellow-300">
                <i className="fas fa-calendar-alt mr-2"></i>
                <span className="text-sm">Monthly Events</span>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-3xl border-4 border-green-400/30 bg-gradient-to-br from-green-400/20 to-emerald-500/20 p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-green-400/50 hover:bg-white/30"
            >
              <div className="mb-4 text-3xl">
                <i className="fas fa-graduation-cap text-green-300"></i>
              </div>
              <h3 className="mb-4 text-xl font-bold text-white group-hover:text-green-300">
                Study Sessions
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-white/90">
                Collaborative study sessions for psychology courses and exam
                preparation.
              </p>
              <div className="flex items-center text-green-300">
                <i className="fas fa-book mr-2"></i>
                <span className="text-sm">Weekly Sessions</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Section */}
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
                  <i className="fas fa-envelope mr-3"></i>
                  Questions About Events?
                </h2>
                <p className="mb-6 text-white/90">
                  Have questions about upcoming events or want to suggest new
                  activities?
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:from-cyan-400 hover:to-teal-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                >
                  Contact Us <i className="fas fa-arrow-right ml-2"></i>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
