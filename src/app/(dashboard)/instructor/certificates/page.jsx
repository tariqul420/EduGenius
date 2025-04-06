import { Award, Download, CheckCircle, BookOpen, ArrowRight } from "lucide-react";

export default function Certificates() {
  const certificates = [
    {
      id: 1,
      courseName: "Complete Web Development Course",
      issuer: "Programming Hero",
      issueDate: "March 4, 2025",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      completion: "100%"
    },
    {
      id: 2,
      courseName: "Advanced JavaScript Concepts",
      issuer: "Code Masters",
      issueDate: "February 15, 2025",
      skills: ["ES6+", "Async Programming", "Design Patterns"],
      completion: "100%"
    },
    {
      id: 3,
      courseName: "UI/UX Design Fundamentals",
      issuer: "Design Academy",
      issueDate: "January 10, 2025",
      skills: ["Figma", "Wireframing", "User Research"],
      completion: "100%"
    }
  ];

  return (
    <section className="min-h-screen">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        {/* Section Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Your Certificates
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Earned through your learning journey
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="space-y-6">
          {certificates.map((certificate) => (
            <div 
              key={certificate.id} 
              className="rounded-lg border bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                {/* Left Section - Icon and Basic Info */}
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                    <Award className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      {certificate.courseName}
                    </h3>
                    <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <BookOpen className="h-4 w-4" />
                      {certificate.issuer}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        {certificate.completion}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Verified
                      </span>
                    </div>
                       {/* Middle Section - Skills */}
                <div className="flex-1 mt-5">
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    SKILLS GAINED
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      >
                        <CheckCircle className="mr-1 h-3 w-3 text-blue-600 dark:text-blue-300" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                  </div>
                </div>

             

                {/* Right Section - Date and Download */}
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Issued on</p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {certificate.issueDate}
                    </p>
                  </div>
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200">
                    <Download className="h-4 w-4" />
                    <span className="font-medium">Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {certificates.length === 0 && (
          <div className="rounded-lg border bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
              <Award className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-gray-200">
              No certificates yet
            </h3>
            <p className="mx-auto mb-6 max-w-md text-gray-600 dark:text-gray-400">
              Complete courses to earn certificates that showcase your new skills.
            </p>
            <button className="mx-auto flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
              Browse Courses
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}