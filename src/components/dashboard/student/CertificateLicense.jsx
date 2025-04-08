export default function CertificateLicense({
  recipientName = "[Recipient Name]",
  courseName = "[Course/Program Name]",
  certificateId = "[Unique ID]",
  instructorName = "[Instructor Name]",
  websiteUrl = "https://edugenius.com",
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="relative w-[900px] rounded-md border border-gray-200 bg-white p-14 shadow-lg">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-dark-bg text-4xl font-bold">Edu Genius</h1>
          </div>
          <div className="text-right">
            <p className="text-dark-input text-sm">Certificate Number</p>
            <p className="text-dark-bg text-base font-medium">
              {certificateId}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-14">
          <p className="text-dark-input mb-6 text-lg uppercase">
            Certificate of Completion
          </p>
          <h1 className="text-main mb-6 text-4xl font-semibold uppercase">
            {courseName}
          </h1>
          <p className="text-dark-input text-base">
            Instructors <b className="text-dark-bg">{instructorName}</b>
          </p>
        </div>

        {/* Details */}
        <div className="mb-14 space-y-4">
          <h2 className="text-dark-bg text-3xl font-bold">{recipientName}</h2>
          <p className="text-dark-input">Date {new Date().toISOString()}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-8">
          <div>
            <p className="text-dark-input text-sm">
              Issued by <span className="font-medium">Edu Genius</span>
            </p>
            <p className="text-dark-input mt-2 text-sm">
              Website:{" "}
              <a href={websiteUrl} className="text-main hover:underline">
                {websiteUrl}
              </a>
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-dark-input mr-2 text-sm">Powered by</span>
            <span className="text-dark-bg text-lg font-bold">Edu Genius</span>
          </div>
        </div>
      </div>
    </div>
  );
}
