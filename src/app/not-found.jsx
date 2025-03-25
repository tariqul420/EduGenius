import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-1px)] flex-col items-center justify-center rounded-lg bg-white p-6 shadow-2xl">
      <div className="space-y-6 text-center">
        {/* Error Icon */}
        <div className="text-8xl text-red-500 dark:text-red-400">
          <span role="img" aria-label="Error">
            😞
          </span>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold">Oops! Something went wrong.</h1>
        <p className="text-lg">
          The page you&apos;re looking for doesn&apos;t exist or an error
          occurred.
        </p>

        {/* Back to Home Button */}
        <Link
          href={"/"}
          className="bg-main hover:bg-main-600 dark:bg-main-600 dark:hover:bg-main-700 mt-6 rounded-lg px-6 py-3 font-semibold text-white shadow-md transition-all focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
