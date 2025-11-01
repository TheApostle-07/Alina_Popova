// pages/terms.tsx (or app/terms/page.tsx)
import { NextPage } from "next";
import Link from "next/link";
import {
  ScrollText,
  UserCheck,
  ShieldCheck,
  CreditCard,
  RotateCcw,
  XOctagon,
  FileText,
  Gavel,
  Globe,
  Scale,
  RefreshCw,
  Mail,
  BadgeInfo,
  Clock,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Terms: NextPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-richblack text-gray-800 dark:text-white py-24 px-6 mt-16">
        <div className="mx-auto max-w-4xl space-y-12">
          <h1 className="text-center text-4xl font-extrabold">
            Terms &amp; Conditions
          </h1>

          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-semibold">Alina Popova</span>. These
            Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of our
            website, products, and services. By accessing or using our site, you
            agree to be bound by these Terms and our{" "}
            <Link href="/privacy" className="text-cerulean underline">
              Privacy Policy
            </Link>
            .
          </p>

          {/* 1. Acceptance of Terms */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <ScrollText size={24} className="mr-2 text-cerulean" />
              Acceptance of Terms
            </h2>
            <p className="text-base leading-relaxed">
              If you do not agree with any part of these Terms, you must not use
              our services. We may update these Terms from time to time; the
              latest version will always be available on this page.
            </p>
          </section>

          {/* 2. Eligibility (18+) */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <UserCheck size={24} className="mr-2 text-cerulean" />
              Eligibility (18+)
            </h2>
            <p className="text-base leading-relaxed">
              You must be at least <span className="font-semibold">18 years old</span> to
              use our services. By using the site, you represent and warrant that
              you are 18+ and have the legal capacity to enter into these Terms.
            </p>
          </section>

          {/* 3. Accounts & Security */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <ShieldCheck size={24} className="mr-2 text-cerulean" />
              Accounts &amp; Security
            </h2>
            <p className="text-base leading-relaxed">
              You are responsible for the accuracy of account information
              (including OTP-based authentication) and for maintaining the
              confidentiality of any login credentials. You agree to notify us
              immediately of any unauthorized use of your account.
            </p>
          </section>

          {/* 4. Products, Pricing & Taxes */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <FileText size={24} className="mr-2 text-cerulean" />
              Products, Pricing &amp; Taxes
            </h2>
            <p className="text-base leading-relaxed">
              We offer digital products and access-based content. Prices are
              displayed at checkout and may change without prior notice. You are
              responsible for any applicable taxes as per local regulations.
            </p>
          </section>

          {/* 5. Payments */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <CreditCard size={24} className="mr-2 text-cerulean" />
              Payments
            </h2>
            <p className="text-base leading-relaxed">
              Payments are processed via our authorized payment partners. By
              submitting payment details, you authorize us and our processors to
              charge the total order amount. Keep your bank/SMS/email references
              for records and support.
            </p>
          </section>

          {/* 6. Refunds Reference */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <RotateCcw size={24} className="mr-2 text-cerulean" />
              Refunds
            </h2>
            <p className="text-base leading-relaxed">
              As digital items are delivered instantly,{" "}
              <span className="font-semibold">all sales are final</span> except as
              expressly provided in our{" "}
              <Link href="/refund-policy" className="text-cerulean underline">
                Refund Policy
              </Link>
              .
            </p>
          </section>

          {/* 7. Delivery of Digital Goods & Access */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <Clock size={24} className="mr-2 text-cerulean" />
              Delivery of Digital Goods &amp; Access
            </h2>
            <p className="text-base leading-relaxed">
              Upon successful payment, access links or downloads are typically
              provided instantly or via email/SMS. You are responsible for using a
              compatible device and stable internet connection.
            </p>
          </section>

          {/* 8. User Conduct / Prohibited Uses */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <XOctagon size={24} className="mr-2 text-cerulean" />
              Prohibited Uses
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
              <li>Reproducing, re-selling, sharing, or redistributing paid content without permission.</li>
              <li>Reverse engineering, scraping, or attempting to bypass security or access controls.</li>
              <li>Using the services for unlawful, harmful, or infringing activity.</li>
            </ul>
          </section>

          {/* 9. Intellectual Property */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <BadgeInfo size={24} className="mr-2 text-cerulean" />
              Intellectual Property
            </h2>
            <p className="text-base leading-relaxed">
              All content, trademarks, graphics, and materials on the site are
              owned by or licensed to <span className="font-semibold">Alina Popova</span> and
              are protected by applicable IP laws. No rights are granted except as
              expressly set out in these Terms.
            </p>
          </section>

          {/* 10. Disclaimers */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <BadgeInfo size={24} className="mr-2 text-cerulean" />
              Disclaimers
            </h2>
            <p className="text-base leading-relaxed">
              Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis
              without warranties of any kind, express or implied, including
              fitness for a particular purpose or non-infringement. We do not
              warrant uninterrupted or error-free availability.
            </p>
          </section>

          {/* 11. Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <Scale size={24} className="mr-2 text-cerulean" />
              Limitation of Liability
            </h2>
            <p className="text-base leading-relaxed">
              To the maximum extent permitted by law, in no event shall we be
              liable for indirect, incidental, special, consequential, or punitive
              damages, or loss of profits, revenue, data, or use, arising out of
              or related to your use of the services.
            </p>
          </section>

          {/* 12. Indemnification */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <ShieldCheck size={24} className="mr-2 text-cerulean" />
              Indemnification
            </h2>
            <p className="text-base leading-relaxed">
              You agree to indemnify and hold harmless us and our affiliates,
              officers, employees, and partners from any claims, liabilities,
              damages, losses, and expenses arising from your use of the services
              or violation of these Terms.
            </p>
          </section>

          {/* 13. Termination */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <XOctagon size={24} className="mr-2 text-cerulean" />
              Suspension &amp; Termination
            </h2>
            <p className="text-base leading-relaxed">
              We may suspend or terminate access at any time for conduct that, in
              our discretion, violates these Terms or harms other users, us, or
              third parties.
            </p>
          </section>

          {/* 14. Governing Law & Disputes */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <Gavel size={24} className="mr-2 text-cerulean" />
              Governing Law &amp; Dispute Resolution
            </h2>
            <p className="text-base leading-relaxed">
              These Terms are governed by the laws of <span className="font-semibold">India</span>.
              Subject to applicable law, courts located in{" "}
              <span className="font-semibold">Gujarat, India</span> shall have exclusive
              jurisdiction. You agree to first attempt to resolve disputes
              informally by contacting us.
            </p>
          </section>

          {/* 15. International Use */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <Globe size={24} className="mr-2 text-cerulean" />
              International Use
            </h2>
            <p className="text-base leading-relaxed">
              You are responsible for compliance with local laws where you access
              the services. Access may not be legal by certain persons or in
              certain countries.
            </p>
          </section>

          {/* 16. Changes to Terms */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <RefreshCw size={24} className="mr-2 text-cerulean" />
              Changes to These Terms
            </h2>
            <p className="text-base leading-relaxed">
              We may modify these Terms at any time. Changes are effective upon
              posting. Continued use after changes constitutes acceptance.
            </p>
          </section>

          {/* 17. Contact */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <Mail size={24} className="mr-2 text-cerulean" />
              Contact Us
            </h2>
            <p className="text-base leading-relaxed">
              For questions regarding these Terms, contact{" "}
              <Link href="mailto:support@alina-popova.com" className="text-cerulean underline">
                support@alina-popova.com
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

export default Terms;
