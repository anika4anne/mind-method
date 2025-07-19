"use client";
import { motion } from "framer-motion";
import { useState } from "react";

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

const officers = [
  {
    name: "Ava Davis",
    position: "President",
    email: "ava.davis@k12.wcsdny.org",
    instagram: "https://www.instagram.com/bestfriend_of_kasia/",
  },
  {
    name: "Anika Anne",
    position: "Chief Technology Officer",
    email: "anika.anne@k12.wcsdny.org",
    instagram: "https://www.instagram.com/anika.anne28/",
  },
];

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);

    // Create email content
    const emailSubject = encodeURIComponent(
      `Mind & Method Contact: ${formData.subject}`,
    );
    const emailBody = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
    `);

    // Send to both email addresses
    const primaryEmail = `mailto:anika.anne@k12.wcsdny.org?subject=${emailSubject}&body=${emailBody}`;
    const secondaryEmail = `mailto:anikaanne2010pal@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    // Open primary email client
    window.open(primaryEmail);

    // Also open secondary email (user can choose which to send from)
    setTimeout(() => {
      window.open(secondaryEmail);
    }, 100);

    alert(
      "Thank you for your message! Your email client will open with the message ready to send.",
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              Contact Us
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-3xl text-2xl font-semibold text-white"
            >
              Have questions about Mind & Method? Let us know!
            </motion.p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.h2
                variants={itemVariants}
                className="mb-8 text-4xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,224,208,0.5)]"
              >
                Send us a Message 💬
              </motion.h2>

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

                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-white"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border-2 border-white/30 bg-white/20 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-white"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border-2 border-white/30 bg-white/20 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-white"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border-2 border-white/30 bg-white/20 px-4 py-3 text-white backdrop-blur-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="join">I want to join the club!</option>
                      <option value="question">I have a question</option>
                      <option value="suggestion">I have a suggestion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-white"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full rounded-xl border-2 border-white/30 bg-white/20 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-4 text-xl font-bold text-white shadow-xl transition-all hover:from-cyan-400 hover:to-teal-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                  >
                    Send Message 🚀
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.h2
                variants={itemVariants}
                className="mb-8 text-4xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,224,208,0.5)]"
              >
                Contact Our Team <i className="fas fa-users"></i>
              </motion.h2>

              <div className="space-y-6">
                {officers.map((officer, index) => (
                  <motion.div
                    key={officer.name}
                    variants={cardVariants}
                    whileHover="hover"
                    className="group relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/30"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-white group-hover:text-cyan-300">
                          {officer.name}
                        </h3>
                        <p className="mb-4 text-sm text-white/90">
                          {officer.position}
                        </p>
                        <div className="space-y-2">
                          <a
                            href={officer.email}
                            className="flex items-center gap-2 text-white/90 transition-colors hover:text-cyan-300"
                          >
                            <i className="fas fa-envelope text-cyan-400"></i>
                            <span className="text-sm">
                              {officer.email.replace("mailto:", "")}
                            </span>
                          </a>
                          {officer.instagram && (
                            <a
                              href={officer.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-white/90 transition-colors hover:text-[#E1306C]"
                            >
                              <i className="fab fa-instagram text-[#E1306C]"></i>
                              <span className="text-sm">Instagram</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* General Contact Info */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="group relative mt-8 overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/30"
              >
                <h3 className="mb-4 text-xl font-bold text-white group-hover:text-cyan-300">
                  General Information 📋
                </h3>
                <div className="space-y-3 text-white/90">
                  <p className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-cyan-400"></i>
                    <span>John Jay High School</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-clock text-cyan-400"></i>
                    <span>Meetings: Thursdays after school</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-users text-cyan-400"></i>
                    <span>Open to all students interested in psychology</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="mt-20"
          >
            <motion.h2
              variants={itemVariants}
              className="mb-8 text-center text-4xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,224,208,0.5)]"
            >
              Quick Links 🔗
            </motion.h2>
            <motion.div
              variants={containerVariants}
              className="grid gap-6 md:grid-cols-3"
            >
              {[
                {
                  title: "Join Our Club",
                  description: "Ready to start your psychology adventure?",
                  link: "/interest",
                  icon: "🚀",
                },
                {
                  title: "Meet Our Team",
                  description: "Learn about our amazing leadership team",
                  link: "/officers",
                  icon: "👥",
                },
                {
                  title: "Club Activities",
                  description: "See what exciting things we do",
                  link: "/interest",
                  icon: "🎭",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative overflow-hidden rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/30"
                >
                  <a href={item.link} className="block">
                    <div className="mb-4 text-4xl">{item.icon}</div>
                    <h3 className="mb-2 text-xl font-bold text-white group-hover:text-cyan-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/90">{item.description}</p>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
