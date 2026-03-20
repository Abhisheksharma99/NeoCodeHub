import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Privacy Policy - NeoCodeHub",
  description: "Privacy Policy for NeoCodeHub - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-600 text-sm leading-relaxed">
          <p className="text-neutral-400 text-xs">Last updated: March 2026</p>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly when using our contact forms, including your name, email address, phone number, and message content. We also collect usage data through analytics to improve our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Respond to your inquiries and provide requested services</li>
              <li>Improve our website and user experience</li>
              <li>Send relevant communications about our services (with your consent)</li>
              <li>Analyze website usage patterns to enhance performance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">3. Data Protection</h2>
            <p>We implement appropriate security measures to protect your personal data. Your information is stored securely and is only accessible to authorized personnel who need it to perform their duties.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">4. Third-Party Services</h2>
            <p>We use third-party services such as EmailJS for form submissions and Google Analytics for website analytics. These services have their own privacy policies governing the use of your information.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">5. Cookies</h2>
            <p>Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can manage cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-8 mb-3">7. Contact Us</h2>
            <p>For any privacy-related questions, please contact us at <a href="mailto:info@NeoCodeHub.com" className="text-neutral-900 underline hover:no-underline">info@NeoCodeHub.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
