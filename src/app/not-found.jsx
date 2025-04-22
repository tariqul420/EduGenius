import Link from "next/link";

const NotFound = () => {
  return (
    <div className="bg-light-bg dark:bg-dark-bg min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300 dark:bg-gray-800">
          <div className="p-8 sm:p-10">
            <div className="text-center">
              {/* Error Icon */}
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
                <span className="text-5xl" role="img" aria-label="Error">
                  😞
                </span>
              </div>

              {/* Error Message */}
              <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                404 - Page Not Found
              </h1>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                Oops! The page you&apos;re looking for doesn&apos;t exist or has been
                moved.
              </p>

              {/* Back to Home Button */}
              <div className="mt-10">
                <Link
                  href="/"
                  className="bg-main hover:bg-main/90 focus:ring-main inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-800"
                >
                  Return to Homepage
                  <svg
                    className="-mr-1 ml-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              {/* Additional Help */}
              <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Need help?{" "}
                  <a
                    href="/contact"
                    className="text-main hover:text-main/80 dark:hover:text-main/70 font-medium transition-colors duration-200"
                  >
                    Contact our support team
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
