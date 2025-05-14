import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    // full‑bleed bar without inner max‑width so content can truly centre
    <header className=" fixed inset-x-0 top-0 z-50 h-20 bg-white/80 backdrop-blur-md shadow-sm">
      {/* Flex wrapper – uses gap+justify to centre nav in viewport */}
      <div className="flex h-full w-full items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center space-x-2">
          <Image src="/images/AP_Logo_2.png" alt="Alina Popova Logo" width={40} height={40} priority />
          <span className="text-2xl font-bold tracking-tight text-cerulean">Alina Popova</span>
        </Link>

        {/* Desktop nav – absolutely centred via transform trick */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:flex md:space-x-10">
          {[
            { label: "Beginners", href: "/beginners" },
            { label: "Businesses", href: "/businesses" },
            { label: "Creators", href: "/creators" },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="text-gray-700 transition hover:text-cerulean">
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA btn (desktop) */}
        <Link
          href="/beginners"
          className="hidden shrink-0 rounded-2xl bg-cerulean px-6 py-2 font-semibold text-white shadow transition hover:bg-cerulean-light md:inline-block"
        >
          Get Started
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-700 focus:outline-none ml-auto"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {["Beginners", "Businesses", "Creators"].map((l) => (
              <Link
                key={l}
                href={`/${l.toLowerCase()}`}
                className="text-gray-700 transition hover:text-cerulean"
                onClick={() => setOpen(false)}
              >
                {l}
              </Link>
            ))}
            <Link
              href="/beginners"
              className="mt-2 rounded-2xl bg-cerulean px-6 py-2 font-semibold text-white shadow transition hover:bg-cerulean-light"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
