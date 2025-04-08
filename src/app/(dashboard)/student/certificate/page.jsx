import CertificateTable from "@/components/dashboard/student/CertificateTable";

const certificates = [
  { id: 1, courseName: "React Fundamentals", issueDate: "2025-03-15" },
  { id: 2, courseName: "JavaScript Advanced", issueDate: "2025-02-20" },
  { id: 3, courseName: "CSS Mastery", issueDate: "2025-01-10" },
];

export default function StudentCertificate() {
  return (
    <section className="container mx-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
      <h1 className="dark:text-medium-bg text-dark-bg mb-6 text-2xl font-semibold">
        Certificate of Completion
      </h1>

      <CertificateTable certificates={certificates} />

      {/* <div>
        <CertificateLicense
          studentName="Alex Johnson"
          courseName="Data Science Fundamentals"
          certificateId="EG-54321"
          instructorName="Dr. Emily Carter"
          websiteUrl="https://edugenius.com"
        />
      </div> */}
    </section>
  );
}
