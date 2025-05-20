// -----------------------------------------------------------------------------
// app/businesses/page.tsx   (or  pages/businesses.tsx)
// -----------------------------------------------------------------------------
// “Businesses” landing page – social‑media growth & paid‑ads engine for SMBs
// and DTC brands.  Built with React 18, TypeScript, TailwindCSS.
// -----------------------------------------------------------------------------

import { type NextPage } from "next";
import Link from "next/link";
import {
  Briefcase, LineChart, ClipboardList, ShieldCheck, TrendingUp, Users2,
  IndianRupee, Users, Heart, BarChart2 , Send,CheckCircle2,Star
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";


/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const features = [
  {
    Icon: Briefcase,
    title: "End‑to‑End Campaigns",
    desc: "We plan, create, and publish across all platforms so your team can focus on the product.",
  },
  {
    Icon: LineChart,
    title: "Paid Ads Engine",
    desc: "ROI‑optimised Meta & TikTok ads managed by ex‑agency growth leads.",
  },
  {
    Icon: ClipboardList,
    title: "Data Dashboard",
    desc: "Real‑time KPIs and tailored insights in a single Notion & Looker studio.",
  },
  {
    Icon: ShieldCheck,
    title: "Brand Guardrails",
    desc: "Consistent tone, colours & compliance for regulated industries.",
  },
  {
    Icon: TrendingUp,
    title: "Conversion Funnels",
    desc: "CRO audits + landing pages that turn clicks into customers.",
  },
  {
    Icon: Users2,
    title: "Dedicated Manager",
    desc: "Slack & Loom support with <24‑h turnaround on all requests.",
  },
] as const;
const tiers = [
  {
    title: "Growth Pack",
    price: "₹ 1 Crore",
    popular: false,
    description: "For enterprises looking to dominate social & paid channels.",
    kpis: [
      { Icon: Users,    color: "text-cerulean",    value: "200 k – 250 k followers" },
      { Icon: Heart,    color: "text-rose-600",    value: "250 k+ actions" },
      { Icon: Send,     color: "text-purple-600",  value: "18 % save-rate" },
      { Icon: BarChart2,color: "text-emerald-600", value: "₹ 5 – 6 Cr Revenue." },
    ],
    features: [
      "360° content & full-funnel ads",
      "Dedicated growth squad",
      "Realtime BI (ROAS • CAC • LTV)",
      "Monthly creative deep-dives",
    ],
  },
  {
    title: "Scale-Up",
    price: "₹ 50 Lakhs",
    popular: true,
    description: "Perfect mix of organic & paid for steady growth.",
    kpis: [
      { Icon: Users,    color: "text-cerulean",    value: "100 k – 150 k followers" },
      { Icon: Heart,    color: "text-rose-600",    value: "150 k actions" },
      { Icon: Send,     color: "text-purple-600",  value: "15 % save-rate" },
      { Icon: BarChart2,color: "text-emerald-600", value: "₹ 1 – 3 Cr revenue." },
    ],
    features: [
      "Paid + organic across 4 platforms",
      "Weekly intel calls & creative swaps",
      "Slack priority support",
      "Quarterly CRO audits",
    ],
  },
  {
    title: "Accelerator",
    price: "₹ 25 Lakhs",
    popular: false,
    description: "Focused campaign for fast-track growth.",
    kpis: [
      { Icon: Users,    color: "text-cerulean",    value: "up to 50 k followers" },
      { Icon: Heart,    color: "text-rose-600",    value: "Organic push" },
      { Icon: Send,     color: "text-purple-600",  value: "10 % save-rate" },
      { Icon: BarChart2,color: "text-emerald-600", value: "₹ 70 L – 1 Cr revenue." },
    ],
    features: [
      "1-channel audit & roadmap",
      "30-day content sprint",
      "Starter Meta ad set",
      "Email support + one sync",
    ],
  },
];

/* ────────── Success‑case reels (9 : 16) ────────── */
const brandReels = [
  {
    src: "/videos/business-1.mp4",
    handle: "@rumba.dubai",
    stats: { followers: "294 k", likes: "210 k", shares: "32 k" },
    revenue: 73.8,  
  },
  {
    src: "/videos/business-2.mp4",
    handle: "@oraclubdubai",
    stats: { followers: "38 k", likes: "155 k", shares: "18 k" },
    revenue: 10.6,
  },
  {
    src: "/videos/business-4.mp4",
    handle: "@evabeachrestaurant",
    stats: { followers: "51.6 k", likes: "340 k", shares: "45 k" },
    revenue: 13.1,
  },
] as const;

const phases = [
  {
    no: "01",
    title: "Audit & Strategy",
    body: "Competitor gap analysis, ICP refinement, and 90‑day KPI roadmap.",
  },
  {
    no: "02",
    title: "Content & Ads Sprint",
    body: "We deploy weekly creative cycles, iterate with real‑time feedback, and A/B paid ads.",
  },
  {
    no: "03",
    title: "Scale & Optimise",
    body: "Quarterly deep‑dives to expand channels, upsell, and unlock new revenue streams.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const BusinessesPage: NextPage = () => (


  <>
  {/* Header */}
    <Header />
  <main className="min-h-screen font-sans text-rich-black/90 dark:text-white mt-16">
    {/* ───────────────────────── Hero ───────────────────────── */}
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#ECF7FF] via-[#C0E0FF] to-[#A8D2FF] dark:from-[#012C46] dark:via-[#013C61] dark:to-[#015B80]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,126,167,0.12)_0%,transparent_70%)]" />

      <div className="mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-6 py-28 text-center">
        <h1 className="mb-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Turn Scrolls into Sales
        </h1>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-charcoal dark:text-white/85">
          Performance‑driven social media & paid ads for modern businesses looking to acquire, convert, and retain loyal customers.
        </p>
        <Link
          href="#features"
          className="rounded-full bg-cerulean px-10 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-cerulean/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cerulean"
        >
          See How We Grow Brands
        </Link>
      </div>
    </section>

    {/* ─────────────────── Feature Grid ─────────────────── */}
    <section id="features" className="bg-white py-24 dark:bg-rich-black/90">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ Icon, title, desc }) => (
          <article key={title} className="flex flex-col items-center text-center transition hover:scale-[1.03]">
            <div className="mb-6 inline-flex size-[80px] items-center justify-center rounded-2xl bg-cerulean/10 p-5 backdrop-blur-sm dark:bg-cerulean/20">
              <Icon className="h-12 w-12 text-cerulean dark:text-cerulean/80" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-charcoal/80 dark:text-white/70">{desc}</p>
          </article>
        ))}
      </div>
    </section>

    {/* ─────────────── 3-Phase Engagement Model ───────────── */}
<section id="process" className="relative overflow-hidden py-24">
  <div
    className="pointer-events-none absolute inset-0 -z-10
               bg-[radial-gradient(circle_at_50%_0%,rgba(0,126,167,0.08)_0%,transparent_70%)]"
  />

  <div className="mx-auto max-w-3xl px-6">
    <h2 className="mb-16 text-center text-3xl font-bold sm:text-4xl">
      Our 3-Phase Growth Model
    </h2>

    <ol className="pl-8">
      {phases.map(({ no, title, body }, idx) => {
        const isLast = idx === phases.length - 1;
        return (
          <li
            key={no}
            className={`
              relative pl-8
              ${!isLast ? "border-l-2 border-cerulean/40 pb-12" : ""}
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
        className="inline-block rounded-full bg-[#FCA311] px-12 py-3 font-semibold text-rich-black
                   shadow-lg transition hover:scale-105 hover:bg-[#ffb733]"
      >
        Book a Strategy Call
      </Link>
    </div>
  </div>
</section>

    <section className="bg-white text-gray-900 py-24">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2 className="mb-4 text-center text-4xl font-bold">
          Pick Your Perfect Plan
        </h2>
        <p className="mb-12 text-center text-gray-500">
          All prices listed are per campaign.
        </p>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map(({ title, price, popular, description, kpis, features }) => (
            <div
              key={title}
              className={`
                relative flex flex-col rounded-2xl bg-white shadow-lg p-8 border border-gray-200
                transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl
                ${popular ? 'lg:scale-105 lg:z-10' : ''}
              `}
            >
              {/* “Most Popular” badge */}
              {popular && (
                <div className="absolute top-4 right-4 flex items-center space-x-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  <Star className="h-4 w-4 fill-current" />
                  <span>POPULAR</span>
                </div>
              )}

              {/* Plan Info */}
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-3xl font-extrabold text-cerulean">
                {price} <span className="text-base font-medium text-gray-500">/ campaign</span>
              </p>
              <p className="mt-2 mb-6 text-gray-500">{description}</p>

              <hr className="mb-6 border-gray-200" />

              {/* KPI Icons + Values */}
              <div className="space-y-4">
                {kpis.map(({ Icon, value, color }) => (
                  <div key={value} className="flex items-center justify-between">
                    <Icon className={`h-6 w-6 ${color}`} />
                    <span className="text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>

              <hr className="my-6 border-gray-200" />

              {/* Features */}
              <ul className="mt-auto space-y-4 text-sm text-gray-600">
                {features.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ─────────────── Success Brands (9 : 16) ─────────────── */}
<section className="py-24">
  <div className="mx-auto max-w-7xl px-6">
    <h2 className="mb-14 text-center text-3xl font-extrabold sm:text-4xl">
      Proven Campaigns. Tangible Revenue.
    </h2>

    <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory
                    lg:grid lg:grid-cols-3 lg:gap-10 lg:overflow-visible">
      {brandReels.map(({ src, handle, stats, revenue }) => (
        <article
          key={handle}
          className="relative snap-center flex-none w-[220px] sm:w-[260px] lg:w-full
                     aspect-[9/16] rounded-3xl ring-1 ring-black/10 shadow-xl
                     transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          {/* radius‑preserving wrapper */}
          <div className="relative h-full w-full overflow-hidden rounded-3xl">

            {/* autoplay video */}
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/25" />

            {/* overlay */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
              {/* handle */}
              <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-rich-black backdrop-blur-sm shadow">
                {handle}
              </span>

              <div className="flex flex-col gap-3">
                {/* stats */}
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

                {/* revenue pill */}
<div
  className="
    flex w-full flex-col items-center justify-center gap-1
    rounded-[16px] bg-gradient-to-r from-emerald-600 to-emerald-500
    px-3 py-2 text-white animate-pulse shadow-xl ring-2 ring-emerald-200/60

    sm:inline-flex sm:w-auto sm:flex-row sm:gap-2 sm:px-6 sm:py-2.5
    md:px-7
  "
>
  {/* label row */}
  <span className="flex items-center gap-1 text-[0.8rem] font-semibold sm:text-[0.9rem]">
    <IndianRupee size={16} strokeWidth={3} className="shrink-0" />
    Monthly&nbsp;Revenue
  </span>

  {/* amount */}
  <span className="text-[0.95rem] font-extrabold tracking-wide sm:text-[1rem]">
    ₹{revenue.toFixed(2)} Cr
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

 {/* ───────────────────── CTA Banner ─────────────────── */}
<section className="py-28">
  <div className="relative mx-auto max-w-7xl px-6">
    {/* Glow behind card */}
    <div
      aria-hidden
      className="absolute inset-0 -z-10 flex items-center justify-center"
    >
      <div className="h-[620px] w-[620px] rounded-full bg-cerulean/20 blur-3xl" />
    </div>

    {/* Glass-morphic CTA card */}
    <div className="relative isolate overflow-hidden rounded-[2.25rem] bg-white/5 backdrop-blur-2xl shadow-2xl ring-1 ring-white/15 p-16 text-center">
      {/* angled gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(0,126,167,0.25)_0%,rgba(0,49,89,0.25)_100%)]"
      />

      <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
        Ready to Boost Revenue&nbsp;&amp;&nbsp;ROAS?
      </h2>
      <p className="mx-auto mb-14 max-w-2xl text-lg leading-relaxed text-white/85">
        Our growth engineers craft data-driven social funnels and paid-ads systems that
        turn scrolls into loyal customers—tailored precisely to your KPIs.
      </p>

      <Link
        href="/contact"
        className="
          relative z-10 inline-flex items-center justify-center gap-3
          rounded-full bg-yellow-400 px-16 py-5 text-xl font-extrabold text-rich-black
          shadow-2xl drop-shadow-lg transition-transform duration-200 transform
          hover:scale-105 hover:bg-yellow-500 hover:shadow-3xl
          focus:outline-none focus:ring-4 focus:ring-yellow-300/50
        "
      >
        Get Your Custom Plan
      </Link>

      {/* streak highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.18)_0%,transparent_60%)]"
      />
    </div>
  </div>
</section>
  </main>
  {/* Footer */}
     <Footer />
  </>
);

export default BusinessesPage;
