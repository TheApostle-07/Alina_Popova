import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showSplash, setShowSplash] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    let cancelled = false;
    const minDelay = new Promise((resolve) => setTimeout(resolve, prefersReducedMotion ? 150 : 500));
    const fontsReady = (document as any).fonts?.ready ?? Promise.resolve();
    const onLoad = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true }));

    Promise.all([minDelay, fontsReady, onLoad]).then(() => {
      if (cancelled) return;
      setShowSplash(false);
      // After splash hides, focus main content for a11y
      setTimeout(() => {
        if (!cancelled) contentRef.current?.focus?.();
      }, 50);
    });
    return () => { cancelled = true; };
  }, [prefersReducedMotion]);

  return (
    <div className={`relative flex flex-col min-h-screen font-sans bg-white text-gray-900 ${showSplash ? 'overflow-hidden' : ''}`} aria-busy={showSplash}>
      {showSplash && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-white"
          role="status"
          aria-live="polite"
          style={{ colorScheme: 'light' }}
        >
          <div className="flex flex-col items-center gap-5">
            {/* Brand mark */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* If /public/logo.svg exists it will show; otherwise the circle initials render */}
              <img src="/images/AP_Logo_2.png" alt="Alina Popova logo" className="h-8 w-8" decoding="async" onError={(e: any) => { e.currentTarget.style.display = 'none'; }} />
              <span className="text-lg tracking-tight whitespace-nowrap">
                <span className="font-semibold text-[#007EA7]">Alina&nbsp;</span>
                <span className="font-extrabold text-[#007EA7]">Popova</span>
              </span>
            </div>

            {/* Elegant spinner ring */}
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full border-2 border-slate-200" aria-hidden />
              <div className="absolute inset-0 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" aria-hidden />
            </div>

            {/* Progress shimmer bar */}
            <div className="relative h-1 w-48 overflow-hidden rounded-full bg-slate-200">
              <div className="absolute inset-y-0 left-0 w-1/3 animate-[loader_1.2s_ease_infinite] bg-slate-900" />
            </div>

            <span className="text-sm text-slate-600">Boosting your reach - setting things up…</span>
          </div>

          {/* Keyframes for shimmer */}
          <style>{`
            @keyframes loader { 0% { transform: translateX(-100%);} 50% { transform: translateX(50%);} 100% { transform: translateX(200%);} }
            @media (prefers-reduced-motion: reduce) {
              .animate-spin { animation: none; }
              .animate-[loader_1.2s_ease_infinite] { animation: none; }
            }
          `}</style>
        </div>
      )}
      {/* Content wrapper with fade-in; inert while splash is visible to avoid FOUC */}
      <div
        ref={contentRef}
        tabIndex={-1}
        inert={showSplash as any}
        aria-hidden={showSplash}
        className={`transition-opacity duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Site Header (fixed height ~64–80px) */}
        <Header />

        {/* Main Content Area: pushed down by pt-20 */}
        <main className="flex-grow container mx-auto px-4 pt-25 pb-8">
          {children}
        </main>

        {/* Site Footer */}
        <Footer />
      </div>
    </div>
  );
}
