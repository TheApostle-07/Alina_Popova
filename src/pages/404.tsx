// src/pages/404.tsx
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-5xl font-extrabold mb-4">404</h1>
      <p className="text-lg mb-6">Sorry, that page doesn’t exist.</p>
      <Link
        href="/"
        className="px-5 py-2 bg-cerulean text-white rounded-2xl hover:bg-cerulean-light transition"
      >
        Go back home
      </Link>
    </div>
  );
}