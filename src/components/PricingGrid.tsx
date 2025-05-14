import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  features: string[];
  buttonLabel: string;
  href: string;
  badge?: string;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '₹0',
    features: [
      'No upfront fees, only profit share',
      'Custom growth roadmap',
      'Ideal for social media newbies',
    ],
    buttonLabel: 'Get Started',
    href: '/beginners',
    badge: 'Popular',
  },
  {
    name: 'Brand Boost',
    price: '₹50,000',
    features: [
      'Tailored campaign strategies',
      'Advanced analytics insights',
      'Dedicated account manager',
    ],
    buttonLabel: 'Learn More',
    href: '/businesses',
  },
  {
    name: 'Creator Pro',
    price: '₹99,999',
    features: [
      '10× revenue growth toolkit',
      'Merch & affiliate setup',
      'VIP support & negotiations',
    ],
    buttonLabel: 'Explore Plan',
    href: '/creators',
    badge: 'Top Tier',
  },
];

export default function PricingGrid() {
  return (
    <section aria-labelledby="plans-heading" className="container mx-auto px-4 py-16">
      <h2
        id="plans-heading"
        className="text-center text-3xl font-extrabold text-gray-900 mb-8"
      >
        Choose Your Plan
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative flex flex-col justify-between bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            {plan.badge && (
              <span className="absolute top-4 right-4 bg-cerulean text-white text-xs font-semibold uppercase py-1 px-3 rounded-full">
                {plan.badge}
              </span>
            )}

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {plan.name}
              </h3>
              <p className="text-4xl font-extrabold text-gray-900 mb-6">
                {plan.price}
              </p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-cerulean-light mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={plan.href}
              className="mt-4 inline-block text-center bg-cerulean hover:bg-cerulean-light text-white font-semibold py-3 px-6 rounded-xl transition-transform transform hover:-translate-y-1"
            >
              {plan.buttonLabel}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
