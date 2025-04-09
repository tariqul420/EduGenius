import StudentDashboard from "@/components/StudentDashboard";

export default function StudentHome() {

  // Sample student data
  const certificates = [
    {
      id: 1,
      courseName: "Complete Web Development Course With Programming Hero",
      issueDate: "March 4, 2025",
      status: "Download"
    },
    {
      id: 2,
      courseName: "Advanced JavaScript Concepts",
      issueDate: "February 15, 2025",
      status: "Download"
    },
    {
      id: 3,
      courseName: "React Masterclass 2025",
      issueDate: "January 28, 2025",
      status: "Download"
    },
    {
      id: 4,
      courseName: "Node.js Backend Development",
      issueDate: "December 10, 2024",
      status: "Download"
    }
  ];

  return (
    <section className="min-h-screen py-8">
     
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your certificates
          </p>
        </div>
        <StudentDashboard></StudentDashboard>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-lg border bg-white p-6 shadow-md dark:border dark:bg-dark-bg">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Certificates
            </h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-2">
              4
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-md dark:border dark:bg-dark-bg">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Recent Certificate
            </h3>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-2">
              March 4, 2025
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-md dark:border dark:bg-dark-bg">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Next Goal
            </h3>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-2">
              2 more certificates
            </p>
          </div>
        </div>

        {/* Certificates Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            My Certificates
          </h2>
          
          {/* Certificate List */}
          <div className="space-y-4">
            {certificates.map((certificate) => (
              <div 
                key={certificate.id} 
                className="rounded-lg border bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:border dark:bg-dark-bg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      Certificate #{certificate.id}
                    </h3>
                    <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
                      {certificate.courseName}
                    </h4>
                  </div>
                  
                  <div className="flex flex-col sm:items-end gap-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Issued: {certificate.issueDate}
                    </p>
                    <button className="flex items-center justify-center gap-1 px-3 py-1 bg-main text-white text-sm rounded hover:bg-dark-btn transition-colors dark:bg-dark-btn dark:hover:bg-dark-btn/80">
                      {certificate.status}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}