// -----------------------------------------------------------------------------
// app/creators/page.tsx   (or pages/creators.tsx)
// -----------------------------------------------------------------------------
// “Creators” landing page – premium tier for seasoned content creators who
// want to 10× revenue, launch products, and build communities. Written in
// TypeScript, designed for Next.js 13/14 App or Pages Router. Uses TailwindCSS.
// -----------------------------------------------------------------------------
import { type NextPage } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  Megaphone,
  DollarSign,
  Users,
  Film,
  ShoppingCart,
  Trophy,
  Heart,
  Share2,
  Send
} from "lucide-react"

import Header from "../components/Header";
import Footer from "../components/Footer";
/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const features = [
  {
    Icon: Megaphone,
    title: "Launch Strategy",
    desc: "Go‑to‑market blueprints for courses, memberships, and digital products.",
  },
  {
    Icon: DollarSign,
    title: "Monetisation Stack",
    desc: "Multiple revenue streams: brand deals, ads, merch, affiliates, NFTs.",
  },
  {
    Icon: Users,
    title: "Community Engine",
    desc: "Turn followers into superfans with Discord / Slack & live events.",
  },
  {
    Icon: Film,
    title: "Pro‑grade Production",
    desc: "Hollywood‑level video templates, motion graphics & editing presets.",
  },
  {
    Icon: ShoppingCart,
    title: "E‑commerce Integration",
    desc: "One‑click Shopify & Gumroad setups, conversion‑optimised pages.",
  },
  {
    Icon: Trophy,
    title: "Creator Mastermind",
    desc: "Bi‑weekly roundtables with 6‑ & 7‑figure creators for peer review.",
  },
] as const;

const steps = [
  {
    no: "01",
    title: "Define the Flagship Offer",
    body: "Validate pricing & positioning for the product your audience can’t refuse.",
  },
  {
    no: "02",
    title: "Automate Content Flywheel",
    body: "Scale short‑form + long‑form output with AI‑assisted batching & repurposing.",
  },
  {
    no: "03",
    title: "Scale Paid Traffic",
    body: "Deploy look‑alike audiences & UGC ads to amplify launches by 10×.",
  },
] as const;

const creatorReels = [
  {
    src: "/videos/creator-1.mp4",
    handle: "@shashikalaofficial9",
    stats: { followers: "196k", likes: "220k", shares: "18k" },
    income: 22.63
  },
  {
    src: "/videos/creator-4.mp4",
    handle: "@narggeas",
    stats: { followers: "113k", likes: "310k", shares: "25k" },
    income: 54.85
  },
  {
    src: "/videos/creator-3.mp4",
    handle: "@_piccola_ketty",
    stats: { followers: "181k", likes: "275k", shares: "22k" },
    income: 18.47
  }
] as const

/* -------------------------------------------------------------------------- */
/*  Page Component                                                            */
/* -------------------------------------------------------------------------- */

const CreatorsPage: NextPage = () => (

  <>
  {/* Header */}
    <Header />
  <main className="min-h-screen font-sans text-rich-black/90 dark:text-white mt-16">
    {/* ───────────────────────── Hero ───────────────────────── */}
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#00171F] via-[#003459] to-[#015B80] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

      <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="mb-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Elevate Your Creator Empire
        </h1>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/85">
          Advanced systems, monetisation tactics, and community frameworks to
          multiply your reach and revenue—all in one elite program.
        </p>
        <Link
          href="#features"
          className="rounded-full bg-[#FCA311] px-10 py-3 font-semibold text-rich-black shadow-lg transition hover:scale-105 hover:bg-[#ffb733] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCA311]"
        >
          Discover the Framework
        </Link>
      </div>
    </section>

    {/* ─────────────────────── Feature Grid ─────────────────── */}
    <section id="features" className="bg-white py-24 dark:bg-rich-black/90">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ Icon, title, desc }) => (
          <article
            key={title}
            className="flex flex-col items-center text-center transition hover:scale-[1.03]"
          >
            <div className="mb-6 inline-flex size-[80px] items-center justify-center rounded-2xl bg-cerulean/10 p-5 backdrop-blur-sm dark:bg-cerulean/20">
              <Icon className="h-12 w-12 text-cerulean dark:text-cerulean/80" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-charcoal/80 dark:text-white/70">
              {desc}
            </p>
          </article>
        ))}
      </div>
    </section>

    {/* ─────────────────────── 3‑Step Roadmap ────────────────── */}
    <section id="roadmap" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(252,163,17,0.08)_0%,transparent_70%)]" />

      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-16 text-center text-3xl font-bold sm:text-4xl">
          Roadmap to 7‑Figure Creator Revenue
        </h2>

        <ol className="relative border-l-2 border-[#FCA311]/40 pl-8">
          {steps.map(({ no, title, body }) => (
            <li key={no} className="mb-12 last:mb-0">
              <span className="absolute -left-[22px] flex h-11 w-11 items-center justify-center rounded-full bg-[#FCA311] text-rich-black text-sm font-bold">
                {no}
              </span>
              <h3 className="mb-1 text-lg font-semibold leading-snug">{title}</h3>
              <p className="max-w-lg text-sm leading-relaxed text-charcoal/80 dark:text-white/70">
                {body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-20 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-cerulean px-12 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-cerulean/90"
          >
            Apply for Creator Pro
          </Link>
        </div>
      </div>
    </section>


    {/* ───────────────────── Success Reels (Creators) ───────────────────── */}
    <section className="py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <h2 className="mb-14 text-center text-3xl font-extrabold sm:text-4xl">
          Creators Who 10×’d Their Income
        </h2>

        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory
                        lg:grid lg:grid-cols-3 lg:gap-10 lg:overflow-visible">
          {creatorReels.map(({ src, handle, stats, income }) => (
            <article
              key={handle}
              className="relative snap-center flex-none w-[220px] sm:w-[260px] lg:w-full
                         aspect-[9/16] overflow-hidden rounded-3xl bg-black/5
                         shadow-xl ring-1 ring-black/10 transition duration-300
                         hover:-translate-y-1 hover:shadow-2xl"
            >
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

              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
                {/* handle pill */}
                <span className="rounded-full bg-white/75 px-3 py-1 text-sm font-medium
                                 text-rich-black backdrop-blur-sm shadow-sm">
                  {handle}
                </span>

                {/* stats + earnings */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between rounded-2xl bg-white/90 px-4 py-3
                                  text-[0.8rem] font-semibold backdrop-blur-lg shadow-sm">
                    <span className="flex items-center gap-1 text-cerulean">
                      <Users size={18} strokeWidth={0} className="fill-current" />
                      {stats.followers}
                    </span>
                    <span className="flex items-center gap-1 text-rose-600">
                      <Heart size={18} strokeWidth={0} className="fill-current" />
                      {stats.likes}
                    </span>
                    <span className="flex items-center gap-1 text-purple-600">
                      <Send size={18} strokeWidth={0} className="fill-current" />
                      {stats.shares}
                    </span>
                  </div>

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
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ───────────────────────── CTA Banner ──────────────────── */}
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#FCA311] via-[#FFC46B] to-[#FCA311]/90 p-14 text-center text-rich-black shadow-xl">
          <h2 className="mb-4 text-3xl font-extrabold leading-snug md:text-4xl">
            Ready to 10× Your Impact & Income?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed opacity-90">
            Join an inner circle of high‑performing creators, weekly office hours, and
            done‑with‑you launch support.
          </p>

          <Link
            href="/contact"
            className="inline-block rounded-full bg-rich-black px-12 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-rich-black/90"
          >
            Get Started Now
          </Link>

          {/* soft overlay light */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_40%)]" />
        </div>
      </div>
    </section>
  </main>
  {/* Footer */}
     <Footer />
  </>
);

export default CreatorsPage;
