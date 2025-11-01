// pages/refund-policy.tsx (or app/refund-policy/page.tsx)
import { NextPage } from "next";
import Link from "next/link";
import {
  RotateCcw,
  CreditCard,
  AlertTriangle,
  Receipt,
  Clock,
  ShieldCheck,
  Mail,
  HelpCircle,
  FileText,
  CheckCircle2
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RefundPolicy: NextPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-richblack text-gray-800 dark:text-white py-24 px-6 mt-16">
        <div className="mx-auto max-w-4xl space-y-12">
          <h1 className="text-center text-4xl font-extrabold">
            Refund Policy
          </h1>

          <p className="text-lg leading-relaxed">
            Thank you for choosing <span className="font-semibold">Alina Popova</span>.
            We sell digital products and access-based content designed for instant delivery.
            As a result, <span className="font-semibold">all sales are final</span>. However,
            we do consider refunds in a few limited, objective cases outlined below.
          </p>

          {/* 1. Quick Summary */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <RotateCcw size={24} className="mr-2 text-cerulean" />
              Quick Summary
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
              <li><span className="font-semibold">Digital items:</span> non-refundable once delivered/access is granted.</li>
              <li><span className="font-semibold">Exceptions:</span> duplicate payment, payment processed but no access delivered, or proven technical error on our side.</li>
              <li><span className="font-semibold">Where possible:</span> we first resolve access issues or replace corrupted/incorrect files.</li>
            </ul>
          </section>

          {/* 2. Eligible Cases */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <CheckCircle2 size={24} className="mr-2 text-cerulean" />
              When a Refund May Be Approved
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
              <li><span className="font-semibold">Duplicate/Accidental Payment:</span> You were charged more than once for the same order.</li>
              <li><span className="font-semibold">Access Not Delivered:</span> Payment succeeded but you did not receive access/download links, and our support could not restore it within a reasonable time (typically 24–48 hours).</li>
              <li><span className="font-semibold">Payment Gateway Error:</span> A confirmed processor error (e.g., gateway glitch) that resulted in a charge without delivery.</li>
              <li><span className="font-semibold">Fraudulent/Unauthorized Transaction:</span> Verified by our team and the payment processor after investigation.</li>
            </ul>
          </section>

          {/* 3. Non-Refundable */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <AlertTriangle size={24} className="mr-2 text-cerulean" />
              Non-Refundable Situations
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
              <li>Change of mind or subjective dissatisfaction with content style after delivery.</li>
              <li>Incorrect purchase due to misunderstanding of product details where the item was delivered as described.</li>
              <li>Payment made using promotional pricing/coupons where access was successfully granted.</li>
              <li>Inability to run content due to device limitations or unsupported setups when minimum requirements were met and content is functioning as intended.</li>
            </ul>
          </section>

          {/* 4. Before You Request a Refund */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <HelpCircle size={24} className="mr-2 text-cerulean" />
              Before You Request a Refund
            </h2>
            <p className="text-base leading-relaxed">
              Most issues are quickly resolved by restoring access or replacing files.
              Please try re-logging, checking spam/junk for our emails, and verifying your payment reference.
              If the issue persists, contact us and we’ll fix it or advise next steps.
            </p>
          </section>

          {/* 5. How to Request */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <Receipt size={24} className="mr-2 text-cerulean" />
              How to Request a Refund
            </h2>
            <p className="text-base leading-relaxed">
              Email us with the subject <span className="font-semibold">“Refund Request”</span> and include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
              <li><span className="font-semibold">Order ID / Transaction ID</span> (from the payment receipt).</li>
              <li><span className="font-semibold">Payment Reference</span> (e.g., UTR/Reference No.).</li>
              <li><span className="font-semibold">Date & Amount Paid</span> and the <span className="font-semibold">email/phone</span> used at checkout.</li>
              <li><span className="font-semibold">Issue Description</span> with screenshots if available.</li>
            </ul>
            <p className="text-base leading-relaxed">
              Contact:{" "}
              <Link href="mailto:support@alina-popova.com" className="text-cerulean underline">
                support@alina-popova.com
              </Link>
            </p>
          </section>

          {/* 6. Processing & Timeline */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <Clock size={24} className="mr-2 text-cerulean" />
              Processing Time & Method
            </h2>
            <p className="text-base leading-relaxed">
              Once we have all details, investigations typically take{" "}
              <span className="font-semibold">2–5 business days</span>. If approved, refunds are issued to the original
              payment method. Your bank or payment provider may take an additional{" "}
              <span className="font-semibold">3–7 business days</span> to reflect the amount.
            </p>
          </section>

          {/* 7. Payment Partners */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <CreditCard size={24} className="mr-2 text-cerulean" />
              Payment Partners & Verification
            </h2>
            <p className="text-base leading-relaxed">
              We may coordinate with payment gateways/banks to verify transactions. Please keep your payment
              SMS/email and bank statement entries handy to speed up the process.
            </p>
          </section>

          {/* 8. Chargebacks */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <ShieldCheck size={24} className="mr-2 text-cerulean" />
              Chargebacks & Disputes
            </h2>
            <p className="text-base leading-relaxed">
              If you believe a charge is incorrect, please contact us first. Filing a chargeback without contacting
              support may delay resolution. We provide full documentation to the payment processor for any dispute.
            </p>
          </section>

          {/* 9. Documentation */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <FileText size={24} className="mr-2 text-cerulean" />
              Documentation We May Request
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
              <li>Proof of charge (bank/SMS/email receipt).</li>
              <li>Screenshots of access issue or error message.</li>
              <li>Identity verification if fraud is suspected.</li>
            </ul>
          </section>

          {/* 10. Changes */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <RotateCcw size={24} className="mr-2 text-cerulean" />
              Changes to This Policy
            </h2>
            <p className="text-base leading-relaxed">
              We may update this Refund Policy periodically. Please review this page for the latest version.
            </p>
          </section>

          {/* 11. Contact */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold">
              <Mail size={24} className="mr-2 text-cerulean" />
              Contact Us
            </h2>
            <p className="text-base leading-relaxed">
              Questions? We’re here to help at{" "}
              <Link href="mailto:support@alina-popova.com" className="text-cerulean underline">
                support@alina-popova.com
              </Link>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RefundPolicy;
