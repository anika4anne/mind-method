"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface Officer {
  name: string;
  position: string;
  bio: string;
  image: string;
  section: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
    email?: string;
    [key: string]: string | undefined;
  };
}

const officers: Officer[] = [
  {
    name: "Ava Davis",
    position: "President",
    bio: "Ava is passionate about making psychology accessible to all students. She leads the club with enthusiasm, creativity, and ensuring every member feels welcome and engaged.",
    image: "/bio/ava3.jpg",
    section: "Leadership Team",
    socials: {
      instagram: "https://www.instagram.com/bestfriend_of_kasia/",
      //linkedin: "https://linkedin.com/in/avadavis",
      email: "mailto:ava.davis@k12.wcsdny.org",
    },
  },
  /*{
    name: "unknown",
    position: "Vice President",
    bio: "bio goes here",
    image: "/officers/unknown.jpg",
    section: "Leadership Team",
    socials: {},
  },*/
  {
    name: "Anika Anne",
    position: "Vice President",
    bio: "Anika is a rising sophomore who loves coding & technology. She recently found an interest in psychology. She plays for the JV volleyball team, and is part of the Robotics and Scioly club",
    image: "/officers/anika.jpg",
    section: "Leadership Team",
    socials: {
      instagram: "https://www.instagram.com/anika.anne28/",
      linkedin: "https://linkedin.com/in/anikaanne",
      email: "mailto:anika.anne@k12.wcsdny.org",
    },
  },
  {
    name: "Francesca",
    position: "Outreach Coordinator",
    bio: "Francesca is a junior who is interested in the field of forensic science and psychology. She is an active member in multiple clubs and honors societies.",
    image: "/bio/francesca.jpg",
    section: "Leadership Team",
    socials: {},
  },
  {
    name: "Malak Aly",
    position: "Blogger",
    bio: "Malak is a junior who love writing and reading, they are going into a career in psychology and are a member of proscenium and other theatre programs",
    image: "/bio/malak.jpg",
    section: "Leadership Team",
    socials: {
      instagram: "https://www.instagram.com/malaknasseraly",
    },
  },
  {
    name: "Sara",
    position: "Secretary",
    bio: "Sara is a sophomore and is so excited to be a part of Mind and Method this year. She has always enjoyed psychology and finds the club to be a great place to explore it alongside others.",
    image: "/bio/sara.webp",
    section: "Leadership Team",
    socials: {},
  },
  /* {
    name: "unknown",
    position: "Treasurer",
    bio: "bio goes here",
    image: "/officers/unknown.jpg",
    section: "Legendary Members",
    socials: {},
  },*/
  /*{
    name: "unknown",
    position: "Event Coordinator",
    bio: "bio goes here",
    image: "/officers/unknown.jpg",
    section: "Legendary Members",
    socials: {},
  },
  {
    name: "unknown",
    position: "Outreach Director",
    bio: "bio goes here",
    image: "/officers/unknown.jpg",
    section: "Legendary Members",
    socials: {},
  },*/
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

const bioContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8,
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

const instagramIconClass =
  "text-white hover:text-[#E1306C] text-2xl transition-colors";
const linkedinIconClass =
  "text-white hover:text-[#0077B5] text-2xl transition-colors";
const emailIconClass =
  "text-white hover:text-[#06b6d4] text-2xl transition-colors";

const positionQualifications: Record<string, string[]> = {
  President: [
    "Strong leadership and communication skills",
    "Experience in organizing events or activities",
    "Passion for psychology and mental health awareness",
    "Ability to work well with diverse groups of people",
    "Commitment to the club's mission and values",
    "Previous leadership experience preferred",
  ],
  "Chief Technology Officer": [
    "Technical skills in web development or digital tools",
    "Experience with social media platforms",
    "Ability to manage club's online presence",
    "Mainting club website",
    "In charge of Google Sheets & Forms",
    "Works closely with president & other officers to update website",
  ],
  Treasurer: [
    "Strong mathematical and organizational skills",
    "Experience with budgeting or financial planning",
    "Basic understanding of financial management",
    "Ability to track and report expenses",
    "Budgets funds for events",
  ],
  Secretary: [
    "Takes meeting minutes",
    "Documents club Progress",
    "Keeps track of attendance",
    "Responsible for posting club agenda",
    "Responsible for emailing meeting minutes (if applicable)",
  ],
  "Media Manager": [
    "Creative design and visual communication skills",
    "Experience with graphic design tools (Canva, Photoshop, etc.)",
    "Social media management experience",
    "Photography or videography skills preferred",
    "Ability to create engaging content",
  ],
  "Outreach Coordinator": [
    "Documents Outreach Events",
    "Strong communication and networking skills",
    "Experience in community engagement or volunteer work",
    "Ability to build relationships with other organizations",
    "Public speaking or presentation skills",
    "Passion for spreading awareness about mental health",
  ],
  Blogger: [
    "Responsible for taking photos & videos of club projects/outreach",
    "Works closely with the media manager to create content",
    "Excellent writing and storytelling skills",
  ],
};

export default function OfficersPage() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const leadershipTeam = officers.filter(
    (o) => o.section === "Leadership Team",
  );

  const orderedPositions = [
    "President",
    //"Chief Technology Officer",
    "Vice President",
    "Treasurer",
    "Secretary",
    "Media Manager",
    "Outreach Coordinator",
    "Blogger",
  ];

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

      <div className="min-h-screen px-6 py-16">
        <div className="container mx-auto max-w-7xl">
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
              Our Amazing Team! 🎉
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-3xl text-2xl font-semibold text-white"
            >
              Meet the dedicated students who make Mind & Method possible. Each
              member brings unique skills and passion to our psychology
              community.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={bioContainerVariants}
            className="mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="mb-8 text-center text-5xl font-bold text-white drop-shadow-[0_2px_16px_rgba(64,224,208,0.5)]"
            >
              Main Officers
            </motion.h2>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {orderedPositions.map((position, index) => {
                const filledOfficer = leadershipTeam.find(
                  (o) => o.position === position,
                );

                if (filledOfficer) {
                  return (
                    <motion.div
                      key={filledOfficer.name}
                      variants={cardVariants}
                      whileHover="hover"
                      className="group perspective-1000 h-88 w-full"
                    >
                      <motion.div
                        className="preserve-3d relative h-full w-full"
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="absolute inset-0 backface-hidden">
                          <div className="relative h-full w-full overflow-hidden rounded-3xl border-4 border-white/30 bg-white/20 shadow-2xl backdrop-blur-sm">
                            <Image
                              src={filledOfficer.image}
                              alt={`${filledOfficer.name} - ${filledOfficer.position}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                              <h3 className="mb-2 text-2xl font-bold drop-shadow">
                                {filledOfficer.name}
                              </h3>
                              <span className="inline-block rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-3 py-1 text-xs font-semibold text-white">
                                {filledOfficer.position}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="absolute inset-0 rotate-y-180 backface-hidden">
                          <div
                            className="flex h-full w-full flex-col justify-center rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-6 shadow-2xl backdrop-blur-sm"
                          >
                            <div className="text-center">
                              <h3 className="mb-4 text-2xl font-bold text-white drop-shadow">
                                {filledOfficer.name}
                              </h3>
                              <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-3 py-1 text-xs font-semibold text-white">
                                {filledOfficer.position}
                              </span>
                              <p className="mb-4 text-sm leading-relaxed text-white/90">
                                {filledOfficer.bio}
                              </p>
                              {filledOfficer.socials &&
                                Object.keys(filledOfficer.socials).length >
                                  0 && (
                                  <div className="mt-2 flex justify-center gap-4">
                                    {filledOfficer.socials.instagram && (
                                      <a
                                        href={filledOfficer.socials.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={instagramIconClass}
                                      >
                                        <i className="fab fa-instagram"></i>
                                      </a>
                                    )}
                                    {filledOfficer.socials.linkedin && (
                                      <a
                                        href={filledOfficer.socials.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={linkedinIconClass}
                                      >
                                        <i className="fab fa-linkedin"></i>
                                      </a>
                                    )}
                                    {filledOfficer.socials.email && (
                                      <a
                                        href={filledOfficer.socials.email}
                                        className={emailIconClass}
                                      >
                                        <i className="fas fa-envelope"></i>
                                      </a>
                                    )}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                } else {
                  return (
                    <motion.div
                      key={position}
                      variants={cardVariants}
                      whileHover="hover"
                      className="group h-88 w-full"
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-3xl border-4 border-dashed border-white/30 bg-white/10 shadow-2xl backdrop-blur-sm">
                        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                          <div className="mb-4 text-6xl opacity-50">📋</div>
                          <h3 className="mb-4 text-2xl font-bold text-white drop-shadow">
                            {position}
                          </h3>
                          <p className="mb-6 text-white/70">
                            Position Available
                          </p>
                          <div className="flex flex-col gap-3">
                            <motion.button
                              onClick={() => setSelectedPosition(position)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:from-purple-400 hover:to-pink-500"
                            >
                              View Qualifications
                            </motion.button>
                            <motion.a
                              href="https://forms.gle/tAQ8QwvrvFN52f3k9"
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:from-cyan-400 hover:to-teal-500"
                            >
                              Apply Here
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={bioContainerVariants}
            className="mt-20 text-center"
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
                <h2 className="mb-4 text-4xl font-bold text-white drop-shadow">
                  Want to become an Officer?
                </h2>
                <p className="mb-6 text-xl text-white/90">
                  We're always looking for passionate students to join our team.
                  If you're interested in psychology, leadership, or making a
                  difference in our school community, we'd love to hear from
                  you.
                </p>
                <motion.a
                  href="/contact-us"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:from-cyan-400 hover:to-teal-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                >
                  Contact Us About Leadership
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Qualifications Modal */}
      {selectedPosition && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedPosition(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative mx-4 max-w-2xl rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/20 to-white/10 p-8 shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPosition(null)}
              className="absolute top-4 right-4 text-2xl text-white/70 transition-colors hover:text-white"
            >
              ×
            </button>

            <div className="text-center">
              <h2 className="mb-6 text-3xl font-bold text-white drop-shadow">
                {selectedPosition} Qualifications
              </h2>

              <div className="mb-8 text-left">
                <h3 className="mb-4 text-xl font-semibold text-cyan-300">
                  Required Skills & Experience:
                </h3>
                <ul className="space-y-3">
                  {positionQualifications[selectedPosition]?.map(
                    (qualification, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <span className="mt-1 text-cyan-400">•</span>
                        <span>{qualification}</span>
                      </motion.li>
                    ),
                  )}
                </ul>
              </div>

              <div className="flex justify-center gap-4">
                <motion.button
                  onClick={() => setSelectedPosition(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/30"
                >
                  Close
                </motion.button>
                <motion.a
                  href="https://forms.gle/tAQ8QwvrvFN52f3k9"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:from-cyan-400 hover:to-teal-500"
                >
                  Apply Now
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
