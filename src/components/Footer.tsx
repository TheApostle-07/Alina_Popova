import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      {/* ─────────── Full‑width footer background ─────────── */}
      <footer className="full-bleed bg-richblack text-white mt-0" aria-label="Site footer">
        {/* Content wrapper (max‑width + internal gutter) */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3 justify-items-center md:justify-items-start text-center md:text-left">
          
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4 inline-flex items-center gap-3">
              <Image src="/images/AP_Logo_2.png" alt="Alina Popova logo" width={32} height={32} className="h-8 w-8" />
              <h3 className="text-2xl font-bold">Alina Popova</h3>
            </div>
            <p className="max-w-xs text-gray-300">
              Scale Your Social Presence, Monetize Your Passion.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="flex flex-col items-center md:items-start space-y-2">
              {["Home", "Beginners", "Businesses", "Creators", "Casting"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                    className="text-gray-300 transition hover:text-cerulean"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Resources</h4>
            <ul className="flex flex-col items-center md:items-start space-y-2">
              {["About Us", "Contact", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                    className="text-gray-300 transition hover:text-cerulean"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 py-4 px-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Alina Popova. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ---------------------------------------------------------------- */}
      {/* Add the full‑bleed utility once globally (e.g., in globals.css)   */}
      {/* ---------------------------------------------------------------- */}
      {/*
        .full-bleed {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
        }
      */}
    </>
  );
}
