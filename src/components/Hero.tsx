// components/Hero.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    /* full‑bleed background */
    <section className="full-bleed relative isolate flex min-h-screen overflow-hidden bg-gradient-to-br from-richblack via-cerulean to-softgray mt-4">
      {/* Animated blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full
                   bg-cerulean/25 blur-3xl mix-blend-multiply animate-blob"
      />
      <div
        aria-hidden
        className="pointer-events-none animation-delay-2000 absolute -bottom-44 -right-44 h-[420px] w-[420px]
                   rounded-full bg-cerulean-light/30 blur-2xl mix-blend-multiply animate-blob"
      />

      {/* Content wrapper  */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl
                flex-col-reverse items-center
                gap-y-16            /* vertical gap on mobile */
                md:flex-row md:gap-x-20 /* horizontal gap on md+ */
                px-6 py-24 lg:px-8"
>
  {/* Text */}
  <div className="flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left space-y-8">
  <h1 className="max-w-lg text-4xl font-extrabold leading-snug sm:text-5xl lg:text-6xl">
      <span className="block text-white tracking-tight">Scale Your Social Presence,</span>
      <span className="block text-[#FFC700] tracking-tight">Monetize Your Passion</span>
    </h1>

    <p className="text-lg text-gray-100/90 sm:text-xl max-w-md leading-relaxed">
      Embark on a creative journey tailored for Beginners, Businesses, and
      Creators—unlock revenue streams and explosive growth with precision-driven
      social media strategies.
    </p>

    {/* Button */}
  <Link
    href="/contact"
    className="
      inline-flex items-center justify-center gap-2
      rounded-full bg-[#FFC700] px-16 py-5
      text-lg font-bold text-[#007EA7] shadow-lg
      transition-transform duration-200
      hover:scale-105 hover:bg-[#FFD700]
      focus:outline-none focus:ring-4 focus:ring-[#FFC700]/50
    "
  >
    Get Your Custom Plan
  </Link>
  </div>

  {/* Illustration */}
  <div className="flex w-full items-center justify-center md:w-1/2">
    <Image
      src="/images/AP_Hero_13.png"
      alt="Social Growth Illustration"
      width={550}
      height={450}
      priority
      className="drop-shadow-2xl"
    />
  </div>
</div>
    </section>
  );
}

/* ------------------------------------------------------------------------- */
/*  Ensure this utility exists once globally (globals.css or Tailwind layer) */
/* ------------------------------------------------------------------------- */
/*
.full-bleed {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
html, body { margin: 0; padding: 0; overflow-x: hidden; }
@keyframes blob {
  0%,100% { transform: translate(0,0) scale(1); }
  33%     { transform: translate(30px,-40px) scale(1.05); }
  66%     { transform: translate(-25px,20px) scale(0.95); }
}
.animate-blob { animation: blob 8s infinite ease-in-out; }
.animation-delay-2000 { animation-delay: 2s; }
*/