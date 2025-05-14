import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-gray-900">
      {/* Site Header (fixed height ~64–80px) */}
      <Header />

      {/* Main Content Area: pushed down by pt-20 */}
      <main className="flex-grow container mx-auto px-4 pt-25 pb-8">
        {children}
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}