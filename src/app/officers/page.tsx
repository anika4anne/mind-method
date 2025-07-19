"use client";
import Image from "next/image";
import { motion } from "framer-motion";

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
    bio: "Ava is passionate about making psychology accessible to all students. She leads the club with enthusiasm and creativity, ensuring every member feels welcome and engaged.",
    image: "/officers/ava2.png",
    section: "Leadership Team",
    socials: {
      instagram: "https://www.instagram.com/bestfriend_of_kasia/",
      //linkedin: "https://linkedin.com/in/avadavis",
      email: "mailto:ava.davis@k12.wcsdny.org",
    },
  },
  {
    name: "unknown",
    position: "Vice President",
    bio: "bio goes here",
    image: "/officers/unknown.jpg",
    section: "Leadership Team",
    socials: {},
  },
  {
    name: "Anika Anne",
    position: "Chief Technology Officer",
    bio: "Anika is a rising sophmore who loves coding & technology, she recently found an interest in psycology. She plays for the JV volleyball team, and is part of the Robotics and Scioly club",
    image: "/officers/anika1.webp",
    section: "Leadership Team",
    socials: {
      instagram: "https://www.instagram.com/anika.anne28/",
      //linkedin: "https://linkedin.com/in/anikaanne",
      email: "mailto:anika.anne@k12.wcsdny.org",
    },
  },
  {
    name: "unknown",
    position: "Treasurer",
    bio: "bio goes here",
    image: "/officers/unknown.jpg",
    section: "Legendary Members",
    socials: {},
  },
  {
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

const bioContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8, // Delay to start after title animation
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

const flipVariants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
};

// Social icon base class for white icons, with brand color on hover
const instagramIconClass =
  "text-white hover:text-[#E1306C] text-2xl transition-colors";
const linkedinIconClass =
  "text-white hover:text-[#0077B5] text-2xl transition-colors";
const emailIconClass =
  "text-white hover:text-[#06b6d4] text-2xl transition-colors";

export default function OfficersPage() {
  const leadershipTeam = officers.filter(
    (o) => o.section === "Leadership Team",
  );
  const legendaryMembers = officers.filter(
    (o) => o.section === "Legendary Members",
  );

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

          {/* Leadership Team Section */}
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
              Outstanding Officers
            </motion.h2>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
            >
              {leadershipTeam.map((officer, index) => (
                <motion.div
                  key={officer.name}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group perspective-1000 h-96 w-full"
                >
                  <motion.div
                    className="preserve-3d relative h-full w-full"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Front of card - Image */}
                    <div className="absolute inset-0 backface-hidden">
                      <div className="relative h-full w-full overflow-hidden rounded-3xl border-4 border-white/30 bg-white/20 shadow-2xl backdrop-blur-sm">
                        <Image
                          src={officer.image}
                          alt={`${officer.name} - ${officer.position}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Overlay with name and position */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                          <h3 className="mb-2 text-2xl font-bold drop-shadow">
                            {officer.name}
                          </h3>
                          <span className="inline-block rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-3 py-1 text-xs font-semibold text-white">
                            {officer.position}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Back of card - Bio */}
                    <div className="absolute inset-0 rotate-y-180 backface-hidden">
                      <div className="flex h-full w-full flex-col justify-center rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-6 shadow-2xl backdrop-blur-sm">
                        <div className="text-center">
                          <h3 className="mb-4 text-2xl font-bold text-white drop-shadow">
                            {officer.name}
                          </h3>
                          <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-3 py-1 text-xs font-semibold text-white">
                            {officer.position}
                          </span>
                          <p className="mb-4 text-sm leading-relaxed text-white/90">
                            {officer.bio}
                          </p>
                          {officer.socials &&
                            Object.keys(officer.socials).length > 0 && (
                              <div className="mt-2 flex justify-center gap-4">
                                {officer.socials.instagram && (
                                  <a
                                    href={officer.socials.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={instagramIconClass}
                                  >
                                    <i className="fab fa-instagram"></i>
                                  </a>
                                )}
                                {officer.socials.linkedin && (
                                  <a
                                    href={officer.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkedinIconClass}
                                  >
                                    <i className="fab fa-linkedin"></i>
                                  </a>
                                )}
                                {officer.socials.email && (
                                  <a
                                    href={officer.socials.email}
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
              ))}
            </motion.div>
          </motion.div>

          {/* Legendary Members Section */}
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
              Legendary Members
            </motion.h2>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {legendaryMembers.map((officer, index) => (
                <motion.div
                  key={officer.name}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group perspective-1000 h-96 w-full"
                >
                  <motion.div
                    className="preserve-3d relative h-full w-full"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Front of card - Image */}
                    <div className="absolute inset-0 backface-hidden">
                      <div className="relative h-full w-full overflow-hidden rounded-3xl border-4 border-white/30 bg-white/20 shadow-2xl backdrop-blur-sm">
                        <Image
                          src={officer.image}
                          alt={`${officer.name} - ${officer.position}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Overlay with name and position */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                          <h3 className="mb-2 text-2xl font-bold drop-shadow">
                            {officer.name}
                          </h3>
                          <span className="inline-block rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-3 py-1 text-xs font-semibold text-white">
                            {officer.position}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Back of card - Bio */}
                    <div className="absolute inset-0 rotate-y-180 backface-hidden">
                      <div className="flex h-full w-full flex-col justify-center rounded-3xl border-4 border-white/30 bg-gradient-to-br from-white/30 to-white/20 p-6 shadow-2xl backdrop-blur-sm">
                        <div className="text-center">
                          <h3 className="mb-4 text-2xl font-bold text-white drop-shadow">
                            {officer.name}
                          </h3>
                          <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-3 py-1 text-xs font-semibold text-white">
                            {officer.position}
                          </span>
                          <p className="mb-4 text-sm leading-relaxed text-white/90">
                            {officer.bio}
                          </p>
                          {officer.socials &&
                            Object.keys(officer.socials).length > 0 && (
                              <div className="mt-2 flex justify-center gap-4">
                                {officer.socials.instagram && (
                                  <a
                                    href={officer.socials.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={instagramIconClass}
                                  >
                                    <i className="fab fa-instagram"></i>
                                  </a>
                                )}
                                {officer.socials.linkedin && (
                                  <a
                                    href={officer.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkedinIconClass}
                                  >
                                    <i className="fab fa-linkedin"></i>
                                  </a>
                                )}
                                {officer.socials.email && (
                                  <a
                                    href={officer.socials.email}
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
              ))}
            </motion.div>
          </motion.div>

          {/* Join the Team Section */}
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:from-cyan-400 hover:to-teal-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                >
                  Contact Us About Leadership
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
