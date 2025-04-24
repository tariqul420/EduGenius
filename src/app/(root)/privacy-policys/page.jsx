"use client";

import {
  AlertTriangle,
  Bell,
  Clock,
  Eye,
  Globe,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

const SectionTitle = ({ icon: Icon, title }) => (
  <h2 className="mt-10 mb-3 flex items-center gap-2 text-2xl font-semibold">
    <Icon className="text-main h-6 w-6" />
    {title}
  </h2>
);

const PrivacyPolicyPage = () => {
  return (
    <div className=" mx-auto max-w-5xl px-4 py-16 dark:bg-dark-bg  dark:border-t-[3px] dark:border-b-0 dark:shadow-none  m-2 ">
      <h1 className="text-main mb-8 text-center text-4xl font-bold">
        EduGenius Privacy Policy
      </h1>

      <p className="mb-6">
        At <strong>EduGenius</strong>, your privacy is our top priority. This
        policy explains how we handle your personal information responsibly.
      </p>

      <SectionTitle icon={User} title="1. Information We Collect" />
      <ul className="mb-6 ml-6 list-disc">
        <li>Your name, email, phone number, and location</li>
        <li>Course progress, test scores, and favorites</li>
        <li>Device data like browser, IP address, and location</li>
        <li>Payment details for purchases</li>
        <li>Communication records (feedback, queries)</li>
      </ul>

      <SectionTitle icon={ShieldCheck} title="2. How We Use Your Information" />
      <ul className="mb-6 ml-6 list-disc">
        <li>To provide and improve your learning experience</li>
        <li>To send you updates and course recommendations</li>
        <li>To process transactions and verify accounts</li>
        <li>To detect fraud and comply with legal requirements</li>
      </ul>

      <SectionTitle icon={Lock} title="3. Data Sharing and Protection" />
      <p className="mb-6">
        We never sell your data. Only essential information is shared with
        trusted services like payment processors and hosting providers.
      </p>

      <SectionTitle icon={Globe} title="4. Cookies and Tracking" />
      <p className="mb-6">
        We use cookies and similar technologies to remember preferences, track
        performance, and personalize your experience.
      </p>

      <SectionTitle icon={Eye} title="5. Your Rights & Choices" />
      <ul className="mb-6 ml-6 list-disc">
        <li>View or download your data</li>
        <li>Correct or delete inaccurate information</li>
        <li>Unsubscribe from emails at any time</li>
        <li>Request limited data usage</li>
      </ul>

      <SectionTitle icon={Clock} title="6. Data Retention" />
      <p className="mb-6">
        We retain your data only as long as needed to provide services or
        fulfill legal requirements. Then we delete or anonymize it securely.
      </p>

      <SectionTitle icon={AlertTriangle} title="7. Children's Privacy" />
      <p className="mb-6">
        EduGenius does not knowingly collect data from children under 13 without
        verified parental consent.
      </p>

      <SectionTitle icon={Bell} title="8. Policy Updates" />
      <p className="mb-6">
        We may update this policy. Major changes will be announced via email or
        on your dashboard.
      </p>

      <SectionTitle icon={Mail} title="9. Contact Us" />
      <p className="mb-6">
        Have questions about your privacy? Reach out to us at: <br />
        📧 <strong>privacy@edugenius.com</strong>
      </p>

      <p className="mt-10 font-semibold">Effective Date: April 23, 2025</p>
    </div>
  );
};

export default PrivacyPolicyPage;
