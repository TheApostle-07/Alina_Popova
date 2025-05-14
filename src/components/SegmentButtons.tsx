import React from 'react';
import Link from 'next/link';
import { UserPlus, Briefcase, TrendingUp } from 'lucide-react';

interface Segment {
  href: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  colorClass: string;
}

const segments: Segment[] = [
  {
    href: '/beginners',
    label: 'New to Social',
    Icon: UserPlus,
    colorClass: 'bg-cerulean',
  },
  {
    href: '/businesses',
    label: 'Brand Boost',
    Icon: Briefcase,
    colorClass: 'bg-cerulean/80',
  },
  {
    href: '/creators',
    label: 'Creator 10×',
    Icon: TrendingUp,
    colorClass: 'bg-cerulean/60',
  },
];

export default function SegmentButtons() {
  return (
    <nav aria-label="Segment navigation" className="container mx-auto px-4 py-12">
      <ul className="flex flex-col sm:flex-row justify-center items-center gap-6">
        {segments.map(({ href, label, Icon, colorClass }) => (
          <li key={href} className="w-full sm:w-auto">
            <Link
              href={href}
              className={
                `group flex items-center justify-center space-x-2 py-3 px-6 ${colorClass} text-white font-semibold rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl`
              }
            >
              <Icon size={24} className="transition-transform group-hover:scale-110" />
              <span className="text-lg leading-snug">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
