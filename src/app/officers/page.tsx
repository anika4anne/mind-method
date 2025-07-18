"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface Officer {
  name: string;
  position: string;
  bio: string;
  image: string;
  section: string;
}

const officers: Officer[] = [
  {
    name: "Ava Davis",
    position: "President",
    bio: "Ava is passionate about making psychology accessible to all students. She leads the club with enthusiasm and creativity, ensuring every member feels welcome and engaged.",
    image: "/officers/ava2.png",
    section: "Leadership Team",
  },
  {
    name: "unknown",
    position: "Vice President",
    bio: "bio goes here",
    image: "/officers/marcus-chen.jpg",
    section: "Leadership Team",
  },
  {
    name: "Anika Anne",
    position: "CTO",
    bio: "Anika's Bio here",
    image: "/officers/sophia-rodriguez.jpg",
    section: "Leadership Team",
  },
  {
    name: "Jordan Kim",
    position: "Treasurer",
    bio: "Jordan handles our club finances and resource management. Their analytical mindset and attention to detail ensure we can provide quality materials and experiences for all our members.",
    image: "/officers/jordan-kim.jpg",
    section: "Legendary Members",
  },
  {
    name: "Emma Thompson",
    position: "Event Coordinator",
    bio: "Emma plans and organizes our special events and workshops. Her creativity and attention to detail make our psychology sessions engaging and memorable for everyone.",
    image: "/officers/emma-thompson.jpg",
    section: "Legendary Members",
  },
  {
    name: "Alex Rivera",
    position: "Outreach Director",
    bio: "Alex connects with other clubs and organizations to build partnerships and expand our impact. Their networking skills help us reach more students interested in psychology.",
    image: "/officers/alex-rivera.jpg",
    section: "Legendary Members",
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

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function OfficersPage() {
  const leadershipTeam = officers.filter(
    (o) => o.section === "Leadership Team",
  );
  const legendaryMembers = officers.filter(
    (o) => o.section === "Legendary Members",
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a5b4fc] via-[#38bdf8] to-[#6366f1] px-6 py-16">
      <div className="container mx-auto max-w-7xl">
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
            Our Team
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-3xl text-xl text-blue-200"
          >
            Meet the dedicated students who make Mind & Method possible. Each
            member brings unique expertise and passion to our psychology
            community.
          </motion.p>
        </motion.div>

        {/* Leadership Team Section */}
        <motion.div
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
            Leadership Team
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
                className="flex flex-col items-center rounded-2xl border border-white/20 bg-white/20 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300"
              >
                {/* Officer Image */}
                <div className="mb-6 h-48 w-48">
                  <motion.div
                    variants={imageVariants}
                    className="relative h-full w-full overflow-hidden rounded-2xl border-4 border-white/30 shadow-xl"
                  >
                    <Image
                      src={officer.image}
                      alt={`${officer.name} - ${officer.position}`}
                      fill
                      className="relative z-10 object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Fallback if image fails to load */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-blue-400/20 to-purple-400/20 text-sm text-white/60">
                      {officer.name}
                    </div>
                  </motion.div>
                </div>

                {/* Officer Info */}
                <div className="text-center">
                  <h3 className="mb-2 text-2xl font-bold text-white drop-shadow">
                    {officer.name}
                  </h3>
                  <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white">
                    {officer.position}
                  </span>
                  <p className="text-sm leading-relaxed text-blue-100">
                    {officer.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Legendary Members Section */}
        <motion.div
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
                className="flex flex-col items-center rounded-2xl border border-white/20 bg-white/20 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300"
              >
                {/* Officer Image */}
                <div className="mb-6 h-48 w-48">
                  <motion.div
                    variants={imageVariants}
                    className="relative h-full w-full overflow-hidden rounded-2xl border-4 border-white/30 shadow-xl"
                  >
                    <Image
                      src={officer.image}
                      alt={`${officer.name} - ${officer.position}`}
                      fill
                      className="relative z-10 object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Fallback if image fails to load */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-blue-400/20 to-purple-400/20 text-sm text-white/60">
                      {officer.name}
                    </div>
                  </motion.div>
                </div>

                {/* Officer Info */}
                <div className="text-center">
                  <h3 className="mb-2 text-2xl font-bold text-white drop-shadow">
                    {officer.name}
                  </h3>
                  <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white">
                    {officer.position}
                  </span>
                  <p className="text-sm leading-relaxed text-blue-100">
                    {officer.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Join the Team Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mt-20 text-center"
        >
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="mx-auto max-w-4xl rounded-2xl border border-white/20 bg-white/20 p-8 shadow-2xl backdrop-blur-xl"
          >
            <h2 className="mb-4 text-3xl font-bold text-white drop-shadow">
              Interested in Leadership?
            </h2>
            <p className="mb-6 text-lg text-blue-100">
              We're always looking for passionate students to join our
              leadership team. If you're interested in psychology, leadership,
              or making a difference in our school community, we'd love to hear
              from you.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block rounded-full bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-700 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:from-cyan-400 hover:to-blue-700 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
            >
              Contact Us About Leadership
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
