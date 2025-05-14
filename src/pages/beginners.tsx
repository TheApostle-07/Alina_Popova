// -----------------------------------------------------------------------------
// app/beginners/page.tsx   (or pages/beginners.tsx)
// -----------------------------------------------------------------------------
// Landing for “Beginners” – polished hierarchy, glass‑blur accents,
// dark‑mode friendly.  Next.js 13/14 + TypeScript + Tailwind.
// -----------------------------------------------------------------------------

import { type NextPage } from "next";
import Link from "next/link";
import {
  Rocket,
  Hammer,
  BarChart3,
  Users,
  Heart,
  Send,
  Share2,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const benefits = [
  {
    Icon: Rocket,
    title: "Rapid Growth Framework",
    desc: "Skip the guesswork with our proven roadmap to traction.",
  },
  {
    Icon: Hammer,
    title: "Hands‑on Templates",
    desc: "Reels, carousels & caption formulas—just plug and post.",
  },
  {
    Icon: BarChart3,
    title: "Data‑Driven Guidance",
    desc: "Weekly check‑ins decode your analytics and next steps.",
  },
] as const;

const steps = [
  {
    no: "01",
    title: "Clarify Your Niche",
    body: "Define mission, audience avatar & brand voice with our worksheets.",
  },
  {
    no: "02",
    title: "Create Magnetic Content",
    body: "Batch‑produce scroll‑stopping posts and Reels in one sitting.",
  },
  {
    no: "03",
    title: "Scale & Monetize",
    body: "Leverage collaborations, offers and DMs that convert attention into revenue.",
  },
] as const;

const reels = [
  {
    src: "/videos/beginner-1.mp4",
    handle: "@theblissbean",
    stats: { followers: "29.8 k", likes: "3 k", shares: "8 k" },
    income: 7.63,   //  ← value in lakhs
  },
  {
    src: "/videos/beginner-4.mp4",
    handle: "@tanu_rao_t.r",
    stats: { followers: "14.4 k", likes: "12 k", shares: "12 k" },
    income: 12.4,
  },
  {
    src: "/videos/beginner-5.mp4",
    handle: "@alondra_ashkar",
    stats: { followers: "8 k", likes: "5 k", shares: "20 k" },
    income: 18.05,
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

const BeginnersPage: NextPage = () => (

  <>
  {/* Header */}
  <Header />
  <main className="min-h-screen font-sans text-rich-black/90 dark:text-white mt-16">
    {/* ───────────────────────── Hero ───────────────────────── */}
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#ECF7FF] to-[#D8ECFF] dark:from-[#00171F] dark:via-[#012C46] dark:to-[#003459]">
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-cerulean/20 blur-[120px] dark:bg-cerulean/40" />

      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center sm:max-w-3xl">
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Start Your Social Journey <br className="hidden sm:inline" /> with Confidence
        </h1>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-charcoal dark:text-white/80">
          Our beginner program equips you with proven strategies, ready‑made templates,
          and live support—everything you need to turn new followers into loyal fans & revenue.
        </p>
        <Link
          href="#steps"
          className="rounded-full bg-cerulean px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-cerulean/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cerulean"
        >
          See How It Works
        </Link>
      </div>
    </section>

    {/* ───────────────────────── Benefits ────────────────────── */}
    <section className="bg-white py-24 dark:bg-rich-black/90">
      <div className="container mx-auto grid gap-12 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ Icon, title, desc }) => (
          <article
            key={title}
            className="flex flex-col items-center text-center transition hover:scale-[1.02]"
          >
            <div className="mb-6 inline-flex size-[72px] items-center justify-center rounded-2xl bg-cerulean/10 p-4 backdrop-blur-sm dark:bg-cerulean/20">
              <Icon className="h-10 w-10 text-cerulean dark:text-cerulean/80" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-charcoal/80 dark:text-white/70">
              {desc}
            </p>
          </article>
        ))}
      </div>
    </section>

    {/* ─────────────────────── Step Timeline ─────────────────── */}
<section id="steps" className="relative overflow-hidden py-24">
  <div
    className="pointer-events-none absolute inset-0 -z-10
               bg-[radial-gradient(circle_at_50%_0%,rgba(0,126,167,0.08)_0%,transparent_70%)]"
  />
  <div className="container mx-auto px-6 sm:max-w-3xl">
    <h2 className="mb-16 text-center text-3xl font-bold sm:text-4xl">
      Three Steps to Your First 1K Followers
    </h2>

    <ol className="pl-8">
      {steps.map(({ no, title, body }, idx) => {
        const isLast = idx === steps.length - 1;
        return (
          <li
            key={no}
            className={`
              relative pl-8
              ${!isLast ? "border-l border-cerulean/30 pb-12" : ""}
              ${isLast ? "pb-0" : ""}
            `}
          >
            {/* Number badge */}
            <span
              className="absolute -left-[22px] top-0 flex h-11 w-11 items-center
                         justify-center rounded-full bg-cerulean text-white
                         text-sm font-bold"
            >
              {no}
            </span>

            {/* Content */}
            <h3 className="mb-1 text-lg font-semibold leading-snug">{title}</h3>
            <p className="max-w-lg text-sm leading-relaxed text-charcoal/80 dark:text-white/70">
              {body}
            </p>
          </li>
        );
      })}
    </ol>

    <div className="mt-20 text-center">
      <Link
        href="/contact"
        className="inline-block rounded-full bg-orange-web px-12 py-3 font-semibold text-rich-black
                   shadow-lg ring-2 ring-orange-web/60 transition hover:scale-105 hover:bg-orange-web/90
                   hover:ring-orange-web"
      >
        Join the Beginner Program
      </Link>
    </div>
  </div>
</section>

   {/* ──────────────── Success Reels (9 : 16) ──────────────── */}
<section className="py-24">
  <div className="container mx-auto max-w-7xl px-6">
    <h2 className="mb-14 text-center text-3xl font-extrabold sm:text-4xl">
      Real Creators. Real Results.
    </h2>

    <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory
                    lg:grid lg:grid-cols-3 lg:gap-10 lg:overflow-visible">
      {reels.map(({ src, handle, stats, income }) => (
        <article
        key={handle}
        /*  preserve radius on hover by animating a wrapper, not the video */
        className="relative snap-center flex-none w-[220px] sm:w-[260px] lg:w-full
                   aspect-[9/16] rounded-3xl ring-1 ring-black/10 shadow-xl
                   transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        {/* wrapper keeps radius during transform */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl">
          {/* video */}
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b
                          from-black/0 via-black/10 to-black/25" />
      
          {/* glass overlay */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
            {/* handle */}
            <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-medium
                             text-rich-black backdrop-blur-sm shadow">
              {handle}
            </span>
      
            <div className="flex flex-col gap-3">
              {/* stats row */}
              <div className="flex items-center justify-between rounded-2xl bg-white/90 px-4 py-3
                              text-[0.8rem] font-semibold backdrop-blur-lg shadow-sm">
                <span className="flex items-center gap-1 text-cerulean">
                  <Users size={18} strokeWidth={0} className="fill-current" /> {stats.followers}
                </span>
                <span className="flex items-center gap-1 text-rose-600">
                  <Heart size={18} strokeWidth={0} className="fill-current" /> {stats.likes}
                </span>
                <span className="flex items-center gap-1 text-purple-600">
                  <Send size={18} strokeWidth={0} className="fill-current" /> {stats.shares}
                </span>
              </div>
      
              {/* earnings pill */}
              <div
                    className="mx-auto inline-flex flex-col items-center justify-center rounded-[16px]
                               bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-2.5
                               text-white shadow-xl ring-2 ring-emerald-200/60"
                  >
                    <span className="text-xs font-medium whitespace-nowrap">
                      💰 Monthly&nbsp;Revenue
                    </span>
                    <span className="text-sm font-extrabold leading-none whitespace-nowrap">
                      ₹{income.toFixed(2)} L
                    </span>
                  </div>
            </div>
          </div>
        </div>
      </article>
      ))}
    </div>
  </div>
</section>

    {/* ─────────────────────── CTA Banner ───────────────────── */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#015B80] via-[#003459] to-[#00171F] p-14 text-center text-white shadow-xl">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

          <h2 className="mb-4 text-3xl font-extrabold leading-snug md:text-4xl">
            Ready to Kick‑start Your Growth?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/90">
            Unlock step‑by‑step videos, drag‑and‑drop templates, and weekly live Q&A sessions
            with our experts.
          </p>

          <Link
            href="/contact"
            className="inline-block rounded-full bg-[#FCA311] px-12 py-3 font-semibold text-rich-black shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:bg-[#ffb733] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCA311]"
          >
            Get Started for Free
          </Link>

          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_35%)]" />
        </div>
      </div>
    </section>
  </main>
   {/* Footer */}
   <Footer />
  </>
);

export default BeginnersPage;