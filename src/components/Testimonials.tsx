// -----------------------------------------------------------------------------
// components/Testimonials.tsx
// -----------------------------------------------------------------------------
// Responsive testimonials slider / grid with uniformly centered content.
// ----------------------------------------------------------------------------- 

import React from "react";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Anita Sharma",
    role: "Startup Founder",
    avatar: "/images/av-1.jpeg",
    quote:
      "Alina Popova transformed our social presence. Within 3 months, our followers grew from 500 to 15 000 and our monthly revenue doubled!",
  },
  {
    name: "Rohan Verma",
    role: "E‑commerce Manager",
    avatar: "/images/av-2.jpeg",
    quote:
      "Their data‑driven insights are game‑changing. Our ad ROI increased by 120 % and we saved 30 % on ad spend.",
  },
  {
    name: "Priya Nair",
    role: "Content Creator",
    avatar: "/images/av-3.jpeg",
    quote:
      "As a creator, I struggled to monetise. Alina Popova helped me set up merch and affiliate funnels, boosting my monthly earnings 7×!",
  },
  
];

export default function Testimonials() {
  return (
    <section
          aria-labelledby="testimonials-heading"
          className="full-bleed bg-softgray pt-20 pb-10 md:pb-0"
        >
      <h2
        id="testimonials-heading"
        className="mb-14 text-center text-3xl font-extrabold text-rich-black md:text-4xl"
      >
        What Our Clients Say
      </h2>

      {/* Snap‑scroll on mobile, 3‑col grid on desktop */}
      <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-6 pb-6 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">        {testimonials.map(({ name, role, avatar, quote }) => (
          <figure
            key={name}
            className="snap-center flex-none w-72 rounded-3xl bg-white p-6 shadow-md transition hover:shadow-lg
                       md:w-auto md:grid md:h-full md:grid-rows-[auto_auto_auto_1fr] place-items-center"
          >
            {/* Avatar */}
            <Image
              src={avatar}
              alt={name}
              width={64}
              height={64}
              className="row-span-1 mb-4 rounded-full"
              priority
            />

            {/* Name & role */}
            <figcaption className="row-span-1 mb-2 text-center">
              <p className="font-semibold text-rich-black">{name}</p>
              <p className="text-sm text-gray-600">{role}</p>
            </figcaption>

            {/* Stars */}
            <div className="row-span-1 mb-4 flex justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="mx-0.5 text-lg text-emerald-500 md:text-xl"
                >
                  ★
                </span>
              ))}
            </div>

            {/* Quote (fills remaining height) */}
            <blockquote className="row-span-1 text-center italic text-charcoal overflow-hidden">
              “{quote}”
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
