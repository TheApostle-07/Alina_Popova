// pages/privacy.tsx (or app/privacy/page.tsx)
import { NextPage } from "next";
import Link from "next/link";
import {
  User,
  FileText,
  ShieldCheck,
  Key,
  RefreshCw,
  Mail
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy: NextPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-richblack text-gray-800 dark:text-white py-24 px-6 mt-16">
        <div className="mx-auto max-w-4xl space-y-12">
          <h1 className="text-center text-4xl font-extrabold">
            Privacy Policy
          </h1>
          <p className="text-lg leading-relaxed">
            Welcome to Alina Popova! This Privacy Policy outlines how we collect,
            use, and protect your personal information. By using our website, you
            consent to the practices described in this policy.
          </p>

          {/* 1. Information We Collect */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <User size={24} className="mr-2 text-cerulean" />
              Information We Collect
            </h2>
            <p className="text-base leading-relaxed">
              We may collect personal information when you visit our website,
              subscribe to our newsletter, or engage with our content. This may
              include your name, email address, phone number, and social media
              profiles.
            </p>
          </section>

          {/* 2. How We Use Your Information */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <FileText size={24} className="mr-2 text-cerulean" />
              How We Use Your Information
            </h2>
            <p className="text-base leading-relaxed">
              We use your personal information to provide you with the best
              possible experience, including personalized content, targeted ads,
              and relevant updates. We may also use this information for
              analytics and marketing purposes.
            </p>
          </section>

          {/* 3. Data Security */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <ShieldCheck size={24} className="mr-2 text-cerulean" />
              Data Security
            </h2>
            <p className="text-base leading-relaxed">
              We take data security seriously. We implement industry-standard
              security measures to protect your personal information from
              unauthorized access, disclosure, or misuse.
            </p>
          </section>

          {/* 4. Your Rights */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <Key size={24} className="mr-2 text-cerulean" />
              Your Rights
            </h2>
            <p className="text-base leading-relaxed">
              You have the right to access, update, or delete your personal
              information at any time. To exercise these rights, please contact
              us at{" "}
              <Link
                href="mailto:privacy@alina-popova.com"
                className="text-cerulean underline"
              >
                privacy@alina-popova.com
              </Link>
              .
            </p>
          </section>

          {/* 5. Changes to This Policy */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <RefreshCw size={24} className="mr-2 text-cerulean" />
              Changes to This Policy
            </h2>
            <p className="text-base leading-relaxed">
              We may update this Privacy Policy periodically. Please check this
              page regularly for the latest information.
            </p>
          </section>

          {/* 6. Contact Us */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <Mail size={24} className="mr-2 text-cerulean" />
              Contact Us
            </h2>
            <p className="text-base leading-relaxed">
              If you have any questions or concerns about this Privacy Policy,
              feel free to contact us at{" "}
              <Link
                href="mailto:privacy@alina-popova.com"
                className="text-cerulean underline"
              >
                privacy@alina-popova.com
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;