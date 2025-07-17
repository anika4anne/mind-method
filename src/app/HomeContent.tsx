import Link from "next/link";
// Remove: import { HydrateClient } from "~/trpc/server";

export default function HomeContent() {
  return (
    <>
      {/* Animated background shapes and psychology elements */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Animated brain SVG in hero area */}
        <svg
          className="animate-brain-float absolute top-10 left-1/2 h-[220px] w-[320px] -translate-x-1/2 opacity-60"
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="160"
            cy="110"
            rx="120"
            ry="90"
            fill="url(#brainGradient)"
          />
          <path
            d="M80 110 Q100 60 160 80 Q220 100 240 60"
            stroke="#7dd3fc"
            strokeWidth="8"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M100 140 Q120 180 160 160 Q200 140 220 180"
            stroke="#a5b4fc"
            strokeWidth="8"
            fill="none"
            opacity="0.7"
          />
          <defs>
            <radialGradient
              id="brainGradient"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="translate(160 110) scale(120 90)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#a5b4fc" />
              <stop offset="1" stopColor="#38bdf8" />
            </radialGradient>
          </defs>
        </svg>
        {/* Floating thought bubbles */}
        <div className="animate-bubble-slow absolute top-1/4 left-1/3 h-24 w-24 rounded-full bg-cyan-200/30 blur-2xl" />
        <div className="animate-bubble-medium absolute top-1/2 right-1/4 h-16 w-16 rounded-full bg-purple-300/30 blur-xl" />
        <div className="animate-bubble-fast absolute bottom-10 left-1/2 h-20 w-20 rounded-full bg-teal-300/20 blur-2xl" />
        {/* Existing blurred shapes for depth */}
        <div className="animate-pulse-slow absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="animate-pulse-slower absolute top-1/3 right-0 h-80 w-80 rounded-full bg-blue-500/20 blur-2xl" />
        <div className="animate-pulse-slower absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-400/20 blur-2xl" />
      </div>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-[#a5b4fc] via-[#38bdf8] to-[#6366f1] px-6 text-white">
        <div className="container mt-6 flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="animate-glow mt-32 text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_32px_rgba(64,112,209,0.7)] sm:text-[5rem]">
            Mind{" "}
            <span className="text-[hsl(201,45%,28%)] drop-shadow-[0_2px_12px_rgba(98,210,227,0.7)]">
              &
            </span>{" "}
            Method
          </h1>
          <p className="max-w-2xl text-center text-xl text-blue-200">
            Explore human behavior. Solve mysteries. Build empathy and
            understanding. Mind & Method is a club dedicated to bringing
            psychology and critical thinking into the heart of our school
            community.
          </p>
          {/* Wavy divider below hero */}
          <div className="mx-auto -mb-8 w-full max-w-4xl">
            <svg
              viewBox="0 0 1440 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-full"
            >
              <path
                d="M0 40 Q360 80 720 40 Q1080 0 1440 40 V80 H0 V40Z"
                fill="url(#waveGradient)"
              />
              <defs>
                <linearGradient
                  id="waveGradient"
                  x1="0"
                  y1="0"
                  x2="1440"
                  y2="80"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#a5b4fc" />
                  <stop offset="1" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* About Section */}
          <section className="w-full max-w-4xl rounded-2xl border border-white/20 bg-white/20 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="mb-4 text-3xl font-bold text-white drop-shadow">
              About Us
            </h2>
            <p className="text-lg leading-relaxed text-blue-100">
              Psychology is often overlooked in schools — we're here to change
              that. Mind & Method is a student-led club focused on making
              psychology approachable, hands-on, and meaningful. Through
              problem-solving activities, forensic challenges, and real-world
              applications, we aim to create a space where students can explore
              human behavior while building critical thinking, collaboration,
              and communication skills.
            </p>
          </section>

          {/* What We Do */}
          <section className="w-full max-w-4xl rounded-2xl border border-white/20 bg-white/20 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="mb-4 text-3xl font-bold text-blue-300 drop-shadow">
              What We Do
            </h2>
            <p className="text-lg leading-relaxed text-blue-100">
              Our weekly sessions include engaging, hands-on experiences such
              as:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-blue-100">
              <li>Solve psychological case studies and behavioral puzzles</li>
              <li>
                Explore forensic techniques through mystery-based challenges
              </li>
              <li>
                Learn about topics like memory, bias, emotion, and
                decision-making
              </li>
              <li>
                Build practical skills in observation, deduction, and
                communication
              </li>
              <li>
                Engage in meaningful discussions around mental health and
                well-being
              </li>
            </ul>
          </section>

          {/* Our Mission */}
          <section className="w-full max-w-4xl rounded-2xl border border-white/20 bg-white/20 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="mb-4 text-3xl font-bold text-blue-300 drop-shadow">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed text-blue-100">
              Mind & Method isn't just about understanding the mind — it's about
              supporting it. We partner with local mental health organizations
              and invite guest speakers like clinicians and teen wellness
              advocates to:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-blue-100">
              <li>Raise awareness around mental health in schools</li>
              <li>Share tools and resources for student wellness</li>
              <li>Advocate for better mental health education</li>
              <li>Create a safe, supportive space for open conversation</li>
            </ul>
          </section>

          {/* Get Involved */}
          <section className="relative w-full max-w-4xl rounded-2xl border border-white/20 bg-white/20 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="mb-4 text-3xl font-bold text-blue-300 drop-shadow">
              Get Involved
            </h2>
            <p className="text-lg leading-relaxed text-blue-100">
              Whether you're curious about psychology, passionate about
              advocacy, or just love solving mysteries — Mind & Method is for
              you. No prior experience needed. Just bring your curiosity and an
              open mind.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/about"
                className="animate-glow relative inline-block rounded-full bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-700 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-105 hover:from-cyan-400 hover:to-blue-700 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                style={{ boxShadow: "0 0 32px 8px rgba(64,112,209,0.25)" }}
              >
                Learn More About the Club
                <span className="absolute -inset-1 -z-10 rounded-full bg-cyan-400/20 opacity-60 blur-lg" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
