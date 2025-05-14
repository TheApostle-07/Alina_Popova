import React from "react";
import { Settings, BarChart2, LifeBuoy } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

const features: Feature[] = [
  {
    title: "Customized Strategies",
    description:
      "Tailored social media roadmaps aligned with your unique goals and audience dynamics.",
    Icon: Settings,
  },
  {
    title: "Data‑Driven Insights",
    description:
      "Real‑time analytics and actionable reports to optimise campaigns and maximise ROI.",
    Icon: BarChart2,
  },
  {
    title: "Dedicated Support",
    description:
      "Our expert team is available around the clock to guide you and troubleshoot challenges.",
    Icon: LifeBuoy,
  },
];

export default function Features() {
  return (
    <section
      aria-labelledby="features-heading"
      role="region"
      className="full-bleed bg-softgray py-20"
    >
      <h2
        id="features-heading"
        className="mb-14 text-center text-3xl font-extrabold text-rich-black md:text-4xl"
      >
        Why Choose Alina Popova
      </h2>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-3 [grid-auto-rows:1fr]">
        {features.map(({ title, description, Icon }) => (
          <article
            key={title}
            className="group relative flex flex-col items-center rounded-3xl bg-white/60 p-8 text-center backdrop-blur-md shadow-md ring-1 ring-black/5
                       transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-cerulean"
          >
            <Icon
              size={48}
              className="mb-6 text-cerulean transition-transform duration-300 group-hover:scale-110"
            />

            <h3 className="mb-3 text-xl font-semibold text-rich-black">
              {title}
            </h3>

            <p className="text-charcoal leading-relaxed">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}