import CertificateLicense from "@/components/dashboard/student/CertificateLicense";

export default function StudentCertificate() {
  return (
    <div>
      <CertificateLicense
        recipientName="Alex Johnson"
        courseName="Data Science Fundamentals"
        completionDate="April 07, 2025"
        certificateId="EG-54321"
        duration="20 hours"
        instructorName="Dr. Emily Carter"
        websiteUrl="https://edugenius.com"
        verificationUrl="https://edugenius.com/verify/EG-54321"
      />
    </div>
  );
}
