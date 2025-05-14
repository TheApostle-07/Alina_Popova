import React from 'react';
import { Settings, BarChart2, LifeBuoy } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

const features: Feature[] = [
  {
    title: 'Customized Strategies',
    description:
      'Tailored social media roadmaps that align with your unique goals and audience dynamics.',
    Icon: Settings,
  },
  {
    title: 'Data-Driven Insights',
    description:
      'Real-time analytics and actionable reports to optimize campaigns and maximize ROI.',
    Icon: BarChart2,
  },
  {
    title: 'Dedicated Support',
    description:
      'Our expert team is available around the clock to guide you and troubleshoot challenges.',
    Icon: LifeBuoy,
  },
];

export default function Features() {
  return (
    <section
      aria-labelledby="features-heading"
      className="container mx-auto px-4 py-16 bg-softgray"
    >
      <h2
        id="features-heading"
        className="text-center text-3xl font-extrabold text-gray-900 mb-12"
      >
        Why Choose Alina Popova
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {features.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="flex flex-col items-start bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <Icon size={40} className="text-cerulean mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}