import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Terms of Service - NeoCodeHub",
  description: "Terms of Service for NeoCodeHub - Read our terms and conditions for using our services.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
        >
          <FaArrowLeft className="text-xs" /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-neutral-900 mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-600 text-sm leading-relaxed">
          <p className="text-neutral-400 text-xs">Last updated: March 2026</p>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using the NeoCodeHub website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">2. Services</h2>
            <p>NeoCodeHub provides software development, web development, mobile app development, and related digital services. The scope, timeline, and deliverables for each project are defined in individual project agreements.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">3. Intellectual Property</h2>
            <p>All content on our website, including text, graphics, logos, and software, is the property of NeoCodeHub and is protected by intellectual property laws. Client deliverables are transferred upon full payment as specified in project agreements.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">4. User Responsibilities</h2>
            <p>When using our services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Provide accurate and complete information</li>
              <li>Not use our services for any unlawful purpose</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Respect the intellectual property rights of others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">5. Payment Terms</h2>
            <p>Payment terms are specified in individual project agreements. Late payments may result in project delays or suspension of services. All fees are non-refundable unless otherwise stated in the agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">6. Limitation of Liability</h2>
            <p>NeoCodeHub shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific services giving rise to the claim.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">7. Termination</h2>
            <p>Either party may terminate the service agreement with written notice as specified in the project agreement. Upon termination, all outstanding payments become immediately due.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of our services constitutes acceptance of modified terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">9. Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:info@NeoCodeHub.com" className="text-neutral-900 underline hover:no-underline">info@NeoCodeHub.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
