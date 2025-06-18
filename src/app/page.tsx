import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-[#9cc6cc] via-[#396a93] to-[#394f7a] px-6 text-white">
        <div className="container mt-6 flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="mt-10 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Mind <span className="text-[hsl(201,45%,28%)]">&</span> Method
          </h1>
          <p className="max-w-2xl text-center text-xl text-blue-200">
            Explore human behavior. Solve mysteries. Build empathy and
            understanding. Mind & Method is a club dedicated to bringing
            psychology and critical thinking into the heart of our school
            community.
          </p>

          {/* About Section */}
          <section className="w-full max-w-4xl rounded-2xl bg-white/10 p-6 shadow-xl">
            <h2 className="mb-4 text-3xl font-bold text-white">About Us</h2>
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
          <section className="w-full max-w-4xl rounded-2xl bg-white/10 p-6 shadow-xl">
            <h2 className="mb-4 text-3xl font-bold text-blue-300">
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
          <section className="w-full max-w-4xl rounded-2xl bg-white/10 p-6 shadow-xl">
            <h2 className="mb-4 text-3xl font-bold text-blue-300">
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
          <section className="w-full max-w-4xl rounded-2xl bg-white/10 p-6 shadow-xl">
            <h2 className="mb-4 text-3xl font-bold text-blue-300">
              Get Involved
            </h2>
            <p className="text-lg leading-relaxed text-blue-100">
              Whether you're curious about psychology, passionate about
              advocacy, or just love solving mysteries — Mind & Method is for
              you. No prior experience needed. Just bring your curiosity and an
              open mind.
            </p>
            <div className="mt-6 text-center">
              <Link
                href="/about"
                className="inline-block rounded-full bg-blue-800 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
              >
                Learn More About the Club
              </Link>
            </div>
          </section>
        </div>
      </main>
    </HydrateClient>
  );
}
