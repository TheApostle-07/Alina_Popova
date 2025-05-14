// pages/contact.tsx (or app/contact/page.tsx for Next.js 13+)
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Loader2,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [calLoaded, setCalLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    const handleCalendlyMessage = (e: MessageEvent) => {
      if (e.data?.event && e.data.event === "calendly:ready") {
        setCalLoaded(true);
      }
    };
    window.addEventListener("message", handleCalendlyMessage);
    // Fallback: hide loader if Calendly hasn’t responded within 10 s
    const fallback = setTimeout(() => setCalLoaded(true), 5000);
    return () => {
      document.body.removeChild(script);
      window.removeEventListener("message", handleCalendlyMessage);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      <Header />

      <main className="mt-20"> {/* add spacing from header */}
        {/* ───────────────────── Contact Hero ───────────────────── */}
        <section className="bg-gradient-to-b from-white to-gray-100 dark:from-richblack/90 dark:to-richblack py-28">
          <div className="container mx-auto px-6 text-center space-y-6">
            <h2 className="text-5xl font-extrabold text-rich-black dark:text-white">
              Let’s Connect
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Whether you’re looking to collaborate, have questions, or simply want to chat, you’ve come to the right place.
            </p>

            {/* ───────── Calendly Embed ───────── */}
            <div className="mx-auto max-w-4xl relative rounded-3xl bg-white dark:bg-richblack/90 shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-700 p-8">
              {!calLoaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/80 dark:bg-richblack/80">
                  <Loader2 className="h-8 w-8 animate-spin text-cerulean" />
                </div>
              )}
              <div
                className="calendly-inline-widget w-full rounded-2xl"
                data-url="https://calendly.com/alinapopovabusiness/30min"
                style={{ minWidth: '320px', height: '650px' }}
              />
            </div>

            {/* ───────── Direct Email Button ───────── */}
            <Link
              href="mailto:alinapopovabusiness@gmail.com"
              className="
                inline-flex items-center justify-center gap-2
                rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500
                px-14 py-4 text-lg font-bold text-rich-black shadow-lg
                transition-transform duration-200 transform hover:scale-105
                focus:outline-none focus:ring-4 focus:ring-yellow-300/50
              "
            >
              <Mail size={20} /> Contact Us via Email
            </Link>
          </div>
        </section>

       {/* Other Ways to Reach Us */}
<section className="py-24 bg-white dark:bg-richblack/95">
  <div className="container mx-auto px-6">
    <h3 className="text-3xl font-semibold text-center text-rich-black dark:text-white mb-12">
      Or Reach Us Here
    </h3>

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {/* Phone */}
      <div className="flex items-start space-x-4 bg-gray-50 dark:bg-richblack p-6 rounded-2xl shadow-md">
        <Phone size={28} className="text-cerulean mt-1" />
        <div>
          <h4 className="font-semibold text-lg text-rich-black dark:text-white">
            Phone
          </h4>
          <Link
            href="tel:+919510394742"
            className="text-cerulean hover:underline"
          >
            +91 95103 94742
          </Link>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start space-x-4 bg-gray-50 dark:bg-richblack p-6 rounded-2xl shadow-md">
        <Mail size={28} className="text-cerulean mt-1" />
        <div>
          <h4 className="font-semibold text-lg text-rich-black dark:text-white">
            Email
          </h4>
          <Link
            href="mailto:alinapopovabusiness@gmail.com"
            className="text-cerulean hover:underline"
          >
            alinapopovabusiness@gmail.com
          </Link>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start space-x-4 bg-gray-50 dark:bg-richblack p-6 rounded-2xl shadow-md">
        <MapPin size={28} className="text-cerulean mt-1" />
        <div>
          <h4 className="font-semibold text-lg text-rich-black dark:text-white">
            Location
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            Office 1203, 12th Floor, Almas Tower<br/>
            Cluster J, Jumeirah Lake Towers<br/>
            Dubai, UAE
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
      </main>

      <Footer />
    </>
  );
}