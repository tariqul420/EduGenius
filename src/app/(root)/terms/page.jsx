"use client";

import { BookOpenText, Gavel, Handshake, ShieldCheck } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-main mb-12 text-center text-4xl font-bold">
        Terms and Conditions
      </h1>

      <div className="space-y-12">
        {/* Term 1 */}
        <div className="flex items-start gap-4">
          <ShieldCheck className="mt-1 h-16 w-16 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold">User Responsibilities</h2>
            <p className="mt-2">
              Users of EduGenius are expected to behave responsibly and
              ethically while using our platform. Any attempt to hack, exploit,
              or harm the system, other users, or resources will be taken
              seriously and may result in legal actions. Users must also ensure
              their account credentials are kept secure and not shared with
              others.
            </p>
          </div>
        </div>

        {/* Term 2 */}
        <div className="flex items-start gap-4">
          <BookOpenText className="mt-1 h-16 w-16 text-green-600" />
          <div>
            <h2 className="text-xl font-semibold">Content Usage</h2>
            <p className="mt-2">
              All learning materials including videos, PDFs, and quizzes are the
              intellectual property of EduGenius. These are provided to support
              your personal learning and growth. Republishing or distributing
              our content on other platforms or using it for commercial purposes
              without written permission is strictly forbidden. Violators may
              face copyright infringement penalties.
            </p>
          </div>
        </div>

        {/* Term 3 */}
        <div className="flex items-start gap-4">
          <Handshake className="mt-1 h-16 w-16 text-purple-600" />
          <div>
            <h2 className="text-xl font-semibold">Privacy and Data</h2>
            <p className="mt-2">
              EduGenius values your privacy. We use your information (like
              email, learning history, preferences) only to improve your
              learning experience and provide personalized services. We do not
              sell or share your personal data with third parties for marketing
              purposes. For more details, please review our Privacy Policy.
            </p>
          </div>
        </div>

        {/* Term 4 */}
        <div className="flex items-start gap-4">
          <Gavel className="mt-1 h-16 w-16 text-red-600" />
          <div>
            <h2 className="text-xl font-semibold">
              Modifications and Termination
            </h2>
            <p className="mt-2">
              EduGenius reserves the right to update or modify these terms at
              any time based on platform improvements, legal changes, or user
              feedback. We may also suspend or terminate your access if we find
              any breach of terms. Users will be notified of any critical
              changes in advance through email or app notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
